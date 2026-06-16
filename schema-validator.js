/**
 * <schema-validator> — validate JSON-LD structured data (schema.org) in the browser.
 * Checks valid JSON, @context, @type, and common required fields. Zero dependencies.
 * Built & maintained by SGBP — Singapore Build Partners (https://sgbp.tech). MIT.
 */
class SchemaValidator extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: "open" }); }
  connectedCallback() { this.render(); }
  _check() {
    const $ = (s) => this.shadowRoot.querySelector(s);
    const raw = $("#in").value.trim(); const out = $("#out");
    if (!raw) { out.innerHTML = ""; return; }
    let data;
    try { data = JSON.parse(raw); }
    catch (e) { out.innerHTML = this._msg("error", "Invalid JSON", e.message); return; }
    const items = Array.isArray(data) ? data : (data["@graph"] || [data]);
    const lines = [];
    let okAll = true;
    items.forEach((node, i) => {
      const ctx = node["@context"] || (data["@context"]);
      const type = node["@type"];
      const label = items.length > 1 ? `Item ${i + 1}: ` : "";
      if (!ctx || !String(JSON.stringify(ctx)).includes("schema.org")) { lines.push(this._row(false, `${label}Missing or non-schema.org @context`)); okAll = false; }
      else lines.push(this._row(true, `${label}@context → schema.org`));
      if (!type) { lines.push(this._row(false, `${label}Missing @type`)); okAll = false; }
      else lines.push(this._row(true, `${label}@type → ${Array.isArray(type) ? type.join(", ") : type}`));
      // light required-field hints for common types
      const hints = { LocalBusiness: ["name", "address"], Product: ["name"], FAQPage: ["mainEntity"], Article: ["headline"], BreadcrumbList: ["itemListElement"] };
      const t = Array.isArray(type) ? type[0] : type;
      (hints[t] || []).forEach((f) => { if (!(f in node)) { lines.push(this._row("warn", `${label}Recommended field "${f}" missing for ${t}`)); } });
    });
    out.innerHTML = this._msg(okAll ? "ok" : "error", okAll ? "Valid JSON-LD" : "Issues found",
      `Parsed ${items.length} item(s).`) + `<div class="rows">${lines.join("")}</div>`;
  }
  _row(state, text) {
    const cls = state === true ? "pass" : state === "warn" ? "warn" : "fail";
    const mark = state === true ? "PASS" : state === "warn" ? "WARN" : "FAIL";
    return `<div class="r"><span class="b ${cls}">${mark}</span><span>${this._esc(text)}</span></div>`;
  }
  _msg(kind, title, sub) { return `<div class="msg ${kind}"><strong>${title}</strong><br><small>${this._esc(sub)}</small></div>`; }
  _esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        *,*::before,*::after{box-sizing:border-box}
        :host{display:block;width:100%;max-width:620px;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif}
        .card{border:1px solid #e2e2e2;border-radius:12px;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.06);padding:16px}
        label{display:flex;justify-content:space-between;align-items:center;font-size:12px;font-weight:600;color:#555;margin-bottom:6px}
        .mini{font:inherit;font-size:11px;font-weight:700;color:#EB0028;background:none;border:0;cursor:pointer}
        textarea{width:100%;min-height:140px;padding:10px;border:1px solid #ccc;border-radius:8px;font-family:ui-monospace,Menlo,monospace;font-size:13px;resize:vertical}
        .msg{border-radius:8px;padding:10px 12px;margin-top:14px;font-size:13px}
        .msg.ok{background:#e6f4ea;color:#137333}.msg.error{background:#fce8e6;color:#c5221f}
        .msg small{color:inherit;opacity:.8}
        .rows{margin-top:10px;display:flex;flex-direction:column;gap:5px}
        .r{display:flex;gap:8px;align-items:center;font-size:13px;color:#444}
        .b{font-size:10px;font-weight:700;padding:2px 7px;border-radius:99px;flex:0 0 auto}
        .pass{background:#e6f4ea;color:#137333}.fail{background:#fce8e6;color:#c5221f}.warn{background:#fef7e0;color:#a16207}
      </style>
      <div class="card">
        <label>Paste your JSON-LD structured data <button class="mini" id="clear">Clear</button></label>
        <textarea id="in" placeholder='{"@context":"https://schema.org","@type":"LocalBusiness","name":"…"}' spellcheck="false"></textarea>
        <div id="out"></div>
      </div>`;
    this.shadowRoot.querySelector("#in").addEventListener("input", () => this._check());
    this.shadowRoot.querySelector("#clear").addEventListener("click", () => {
      const i = this.shadowRoot.querySelector("#in"); i.value = ""; this.shadowRoot.querySelector("#out").innerHTML = ""; i.focus();
    });
  }
}
if (!customElements.get("schema-validator")) customElements.define("schema-validator", SchemaValidator);
