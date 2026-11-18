/* @ds-bundle: {"format":4,"namespace":"LAPBEEDesignSystem_7efb49","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Wordmark","sourcePath":"components/core/Wordmark.jsx"},{"name":"LOGO_MARK","sourcePath":"components/core/logoMark.js"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Pagination","sourcePath":"components/navigation/Pagination.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"},{"name":"Dialog","sourcePath":"components/surfaces/Dialog.jsx"},{"name":"Toast","sourcePath":"components/surfaces/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/surfaces/Tooltip.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"c12ba0d755c3","components/core/Button.jsx":"b7e1eb342f1e","components/core/Icon.jsx":"3ee54a2e272e","components/core/IconButton.jsx":"530bc1e01704","components/core/Tag.jsx":"22a1b7cb428c","components/core/Wordmark.jsx":"69d7bce3d7a5","components/core/logoMark.js":"d60c2bd04742","components/forms/Checkbox.jsx":"2396b320c035","components/forms/Input.jsx":"60ecfc4fbf4c","components/forms/Radio.jsx":"5178b0dab21b","components/forms/Select.jsx":"e93bf8bb9eed","components/forms/Switch.jsx":"8bb8b59cf98a","components/navigation/Pagination.jsx":"9eb57549596c","components/navigation/Tabs.jsx":"4d0d3e08587f","components/surfaces/Card.jsx":"fd62d533c5f5","components/surfaces/Dialog.jsx":"7b137599b4ba","components/surfaces/Toast.jsx":"595e0f0510c7","components/surfaces/Tooltip.jsx":"bf5e38a37035","ui_kits/website/About.jsx":"f745736c57fd","ui_kits/website/Booking.jsx":"e98b23166487","ui_kits/website/Home.jsx":"06dcec72d79a","ui_kits/website/Journey.jsx":"1aa8f2d06cec","ui_kits/website/Posts.jsx":"0f722062f62d","ui_kits/website/Process.jsx":"c13e588dbf6e","ui_kits/website/Shell.jsx":"91271a5f24b1","ui_kits/website/data.js":"cb6c896f863c","ui_kits/website/motion.js":"ea9730bb203c"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.LAPBEEDesignSystem_7efb49 = window.LAPBEEDesignSystem_7efb49 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
const T = {
  neutral: ["var(--ink-100)", "var(--ink-700)"],
  brand: ["var(--brand)", "var(--on-brand)"],
  ink: ["var(--ink-950)", "var(--fg-inverse-1)"],
  success: ["var(--success-soft)", "var(--success)"],
  danger: ["var(--danger-soft)", "var(--danger)"],
  info: ["var(--info-soft)", "var(--info)"],
  warning: ["var(--warning-soft)", "var(--warning)"]
};
function Badge({
  tone = "neutral",
  dot = false,
  children,
  style
}) {
  const [bg, fg] = T[tone] || T.neutral;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      height: 22,
      padding: "0 8px",
      borderRadius: "var(--radius-xs)",
      background: bg,
      color: fg,
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: "var(--ls-mono)",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
      ...style
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 999,
      background: "currentColor"
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Icon({
  name = "wrench",
  size = 20,
  color = "currentColor",
  style,
  ...rest
}) {
  const url = `https://unpkg.com/lucide-static@0.460.0/icons/${name}.svg`;
  return /*#__PURE__*/React.createElement("span", _extends({
    "aria-hidden": "true"
  }, rest, {
    style: {
      display: "inline-block",
      flex: "none",
      width: size,
      height: size,
      backgroundColor: color,
      WebkitMaskImage: `url(${url})`,
      maskImage: `url(${url})`,
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      ...style
    }
  }));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useHP() {
  const [h, setH] = React.useState(false);
  const [p, setP] = React.useState(false);
  return [h, p, {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => {
      setH(false);
      setP(false);
    },
    onMouseDown: () => setP(true),
    onMouseUp: () => setP(false)
  }];
}
const SIZES = {
  sm: {
    h: 36,
    px: 14,
    fs: 14,
    ic: 16
  },
  md: {
    h: 44,
    px: 20,
    fs: 15,
    ic: 18
  },
  lg: {
    h: 52,
    px: 26,
    fs: 16,
    ic: 20
  }
};
function Button({
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  disabled = false,
  full = false,
  children,
  onClick,
  href,
  type = "button",
  style
}) {
  const [h, p, ev] = useHP();
  const s = SIZES[size] || SIZES.md;
  const V = {
    primary: {
      bg: h ? "var(--brand-hover)" : "var(--brand)",
      fg: "var(--on-brand)",
      bd: "transparent"
    },
    secondary: {
      bg: h ? "var(--ink-800)" : "var(--ink-950)",
      fg: "var(--fg-inverse-1)",
      bd: "transparent"
    },
    outline: {
      bg: h ? "var(--ink-50)" : "transparent",
      fg: "var(--fg-1)",
      bd: "var(--border-strong)"
    },
    ghost: {
      bg: h ? "var(--ink-100)" : "transparent",
      fg: "var(--fg-1)",
      bd: "transparent"
    },
    inverse: {
      bg: h ? "var(--band-hover)" : "transparent",
      fg: "var(--band-fg)",
      bd: "var(--band-border)"
    }
  }[variant] || {};
  const Tag = href ? "a" : "button";
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    type: href ? undefined : type,
    onClick: disabled ? undefined : onClick,
    disabled: disabled
  }, disabled ? {} : ev, {
    style: {
      display: full ? "flex" : "inline-flex",
      width: full ? "100%" : undefined,
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      height: s.h,
      padding: `0 ${s.px}px`,
      fontFamily: "var(--font-body)",
      fontSize: s.fs,
      fontWeight: 600,
      letterSpacing: "-0.005em",
      whiteSpace: "nowrap",
      textDecoration: "none",
      borderRadius: "var(--radius-sm)",
      border: `1px solid ${V.bd}`,
      background: V.bg,
      color: V.fg,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.4 : 1,
      transform: p ? "translateY(1px)" : "none",
      transition: "background var(--dur-fast) var(--ease-out), transform var(--dur-fast)",
      ...style
    }
  }), iconLeft && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconLeft,
    size: s.ic
  }), children, iconRight && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: s.ic
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useHP() {
  const [h, setH] = React.useState(false);
  const [p, setP] = React.useState(false);
  return [h, p, {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => {
      setH(false);
      setP(false);
    },
    onMouseDown: () => setP(true),
    onMouseUp: () => setP(false)
  }];
}
function IconButton({
  icon = "menu",
  label,
  variant = "outline",
  size = "md",
  onClick,
  disabled = false,
  style
}) {
  const [h, p, ev] = useHP();
  const d = {
    sm: 36,
    md: 44,
    lg: 52
  }[size] || 44;
  const V = {
    primary: [h ? "var(--brand-hover)" : "var(--brand)", "var(--on-brand)", "transparent"],
    secondary: [h ? "var(--ink-800)" : "var(--ink-950)", "var(--fg-inverse-1)", "transparent"],
    outline: [h ? "var(--ink-50)" : "transparent", "var(--fg-1)", "var(--border-2)"],
    ghost: [h ? "var(--ink-100)" : "transparent", "var(--fg-1)", "transparent"],
    inverse: [h ? "var(--band-hover)" : "transparent", "var(--band-fg)", "var(--band-border)"]
  }[variant];
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    title: label,
    onClick: onClick,
    disabled: disabled
  }, ev, {
    style: {
      width: d,
      height: d,
      display: "inline-grid",
      placeItems: "center",
      borderRadius: "var(--radius-sm)",
      background: V[0],
      color: V[1],
      border: `1px solid ${V[2]}`,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.4 : 1,
      transform: p ? "translateY(1px)" : "none",
      transition: "background var(--dur-fast)",
      padding: 0,
      ...style
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: Math.round(d * 0.42)
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function Tag({
  selected = false,
  onClick,
  children,
  count,
  style
}) {
  const [h, setH] = React.useState(false);
  const bg = selected ? "var(--ink-950)" : h ? "var(--ink-100)" : "transparent";
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      height: 34,
      padding: "0 14px",
      borderRadius: "var(--radius-pill)",
      border: `1px solid ${selected ? "var(--ink-950)" : "var(--border-2)"}`,
      background: bg,
      color: selected ? "var(--fg-inverse-1)" : "var(--fg-1)",
      fontFamily: "var(--font-body)",
      fontSize: 14,
      fontWeight: 500,
      cursor: "pointer",
      transition: "background var(--dur-fast)",
      whiteSpace: "nowrap",
      ...style
    }
  }, children, count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      color: selected ? "var(--accent-on-strong)" : "var(--fg-3)"
    }
  }, count));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/core/logoMark.js
try { (() => {
// LAPBEE logo mark (hexagon hive + wrench & screwdriver), embedded so it resolves from any consumer path. Source: assets/logo-mark.png (156×144).
const LOGO_MARK = "data:image/png;base64,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";
Object.assign(__ds_scope, { LOGO_MARK });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/logoMark.js", error: String((e && e.message) || e) }); }

// components/core/Wordmark.jsx
try { (() => {
function Wordmark({
  size = 24,
  inverse = false,
  tagline = false,
  mark = true,
  markOnly = false,
  style
}) {
  const fg = inverse ? "var(--band-fg)" : "var(--fg-1)";
  const m = /*#__PURE__*/React.createElement("img", {
    src: __ds_scope.LOGO_MARK,
    alt: markOnly ? "LAPBEE" : "",
    style: {
      height: size * 1.6,
      width: "auto",
      display: "block",
      flex: "none"
    }
  });
  if (markOnly) return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      ...style
    }
  }, m);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: size * 0.4,
      color: fg,
      ...style
    }
  }, mark && m, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "baseline",
      gap: size * 0.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontVariationSettings: '"wdth" 125',
      fontWeight: 800,
      fontSize: size,
      letterSpacing: "-0.02em",
      lineHeight: 1
    }
  }, "LAP", /*#__PURE__*/React.createElement("span", {
    style: {
      background: "var(--brand)",
      color: "var(--on-brand)",
      padding: `0 ${size * 0.12}px`,
      marginLeft: size * 0.04,
      borderRadius: 2
    }
  }, "BEE")), tagline && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: Math.max(10, size * 0.42),
      letterSpacing: "var(--ls-mono)",
      textTransform: "uppercase",
      color: inverse ? "var(--band-fg-2)" : "var(--fg-2)"
    }
  }, "since 2012")));
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  checked,
  defaultChecked = false,
  onChange,
  label,
  disabled = false,
  style
}) {
  const [inner, setInner] = React.useState(defaultChecked);
  const on = checked ?? inner;
  const toggle = () => {
    if (disabled) return;
    setInner(!on);
    onChange && onChange(!on);
  };
  return /*#__PURE__*/React.createElement("label", {
    onClick: toggle,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      fontFamily: "var(--font-body)",
      fontSize: 15,
      color: "var(--fg-1)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    role: "checkbox",
    "aria-checked": on,
    style: {
      width: 20,
      height: 20,
      flex: "none",
      display: "grid",
      placeItems: "center",
      borderRadius: "var(--radius-xs)",
      border: `1.5px solid ${on ? "var(--ink-950)" : "var(--ink-400)"}`,
      background: on ? "var(--ink-950)" : "var(--surface-card)",
      color: "var(--accent-on-strong)",
      transition: "background var(--dur-fast)"
    }
  }, on && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 14
  })), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Field({
  label,
  hint,
  error,
  children
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      fontFamily: "var(--font-body)"
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "var(--fg-1)"
    }
  }, label), children, (error || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: error ? "var(--danger)" : "var(--fg-2)"
    }
  }, error || hint));
}
function Input({
  label,
  hint,
  error,
  icon,
  multiline = false,
  rows = 4,
  placeholder,
  value,
  defaultValue,
  onChange,
  type = "text",
  disabled = false,
  style
}) {
  const [f, setF] = React.useState(false);
  const bd = error ? "var(--danger)" : f ? "var(--ink-950)" : "var(--border-2)";
  const box = {
    width: "100%",
    border: `1px solid ${bd}`,
    borderRadius: "var(--radius-sm)",
    background: disabled ? "var(--surface-sunken)" : "var(--surface-card)",
    boxShadow: f ? "var(--shadow-focus)" : "none",
    transition: "box-shadow var(--dur-fast), border-color var(--dur-fast)",
    display: "flex",
    alignItems: multiline ? "flex-start" : "center",
    gap: 10,
    padding: multiline ? "12px 14px" : "0 14px",
    minHeight: 44,
    opacity: disabled ? 0.6 : 1
  };
  const inp = {
    flex: 1,
    minWidth: 0,
    border: 0,
    outline: 0,
    background: "transparent",
    font: "inherit",
    fontSize: 16,
    color: "var(--fg-1)",
    height: multiline ? undefined : 42,
    resize: "vertical",
    padding: 0
  };
  const P = {
    placeholder,
    value,
    defaultValue,
    onChange,
    disabled,
    onFocus: () => setF(true),
    onBlur: () => setF(false),
    style: inp
  };
  return /*#__PURE__*/React.createElement("div", {
    style: style
  }, /*#__PURE__*/React.createElement(Field, {
    label: label,
    hint: hint,
    error: error
  }, /*#__PURE__*/React.createElement("span", {
    style: box
  }, icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 18,
    color: "var(--fg-3)",
    style: {
      marginTop: multiline ? 2 : 0
    }
  }), multiline ? /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows
  }, P)) : /*#__PURE__*/React.createElement("input", _extends({
    type: type
  }, P)))));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function Radio({
  options = [],
  value,
  defaultValue,
  onChange,
  name = "radio",
  direction = "column",
  style
}) {
  const [inner, setInner] = React.useState(defaultValue);
  const cur = value ?? inner;
  return /*#__PURE__*/React.createElement("div", {
    role: "radiogroup",
    style: {
      display: "flex",
      flexDirection: direction,
      gap: direction === "row" ? 20 : 12,
      flexWrap: "wrap",
      ...style
    }
  }, options.map(o => {
    const v = typeof o === "string" ? o : o.value;
    const l = typeof o === "string" ? o : o.label;
    const on = cur === v;
    return /*#__PURE__*/React.createElement("label", {
      key: v,
      onClick: () => {
        setInner(v);
        onChange && onChange(v);
      },
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        cursor: "pointer",
        fontFamily: "var(--font-body)",
        fontSize: 15,
        color: "var(--fg-1)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      role: "radio",
      "aria-checked": on,
      style: {
        width: 20,
        height: 20,
        borderRadius: 999,
        flex: "none",
        border: `1.5px solid ${on ? "var(--ink-950)" : "var(--ink-400)"}`,
        display: "grid",
        placeItems: "center",
        background: "var(--surface-card)"
      }
    }, on && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 10,
        height: 10,
        borderRadius: 999,
        background: "var(--ink-950)",
        boxShadow: "0 0 0 2px var(--accent-on-strong) inset"
      }
    })), l);
  }));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function Field({
  label,
  hint,
  error,
  children
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      fontFamily: "var(--font-body)"
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "var(--fg-1)"
    }
  }, label), children, (error || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: error ? "var(--danger)" : "var(--fg-2)"
    }
  }, error || hint));
}
function Select({
  label,
  hint,
  error,
  options = [],
  value,
  defaultValue,
  onChange,
  placeholder,
  disabled = false,
  style
}) {
  const [f, setF] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: style
  }, /*#__PURE__*/React.createElement(Field, {
    label: label,
    hint: hint,
    error: error
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: value,
    defaultValue: defaultValue ?? (placeholder ? "" : undefined),
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setF(true),
    onBlur: () => setF(false),
    style: {
      appearance: "none",
      WebkitAppearance: "none",
      width: "100%",
      height: 44,
      padding: "0 40px 0 14px",
      font: "inherit",
      fontSize: 16,
      color: "var(--fg-1)",
      background: "var(--surface-card)",
      border: `1px solid ${error ? "var(--danger)" : f ? "var(--ink-950)" : "var(--border-2)"}`,
      borderRadius: "var(--radius-sm)",
      boxShadow: f ? "var(--shadow-focus)" : "none",
      outline: 0,
      cursor: "pointer",
      opacity: disabled ? 0.6 : 1
    }
  }, placeholder && /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder), options.map(o => {
    const v = typeof o === "string" ? o : o.value;
    const l = typeof o === "string" ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 18,
    color: "var(--fg-2)",
    style: {
      position: "absolute",
      right: 12,
      top: 13,
      pointerEvents: "none"
    }
  }))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  checked,
  defaultChecked = false,
  onChange,
  label,
  disabled = false,
  style
}) {
  const [inner, setInner] = React.useState(defaultChecked);
  const on = checked ?? inner;
  return /*#__PURE__*/React.createElement("label", {
    onClick: () => {
      if (disabled) return;
      setInner(!on);
      onChange && onChange(!on);
    },
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      fontFamily: "var(--font-body)",
      fontSize: 15,
      color: "var(--fg-1)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    role: "switch",
    "aria-checked": on,
    style: {
      width: 40,
      height: 24,
      borderRadius: 999,
      padding: 3,
      flex: "none",
      background: on ? "var(--ink-950)" : "var(--ink-300)",
      transition: "background var(--dur-base) var(--ease-out)",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      borderRadius: 999,
      background: on ? "var(--accent-on-strong)" : "#FFFFFF",
      transform: on ? "translateX(16px)" : "none",
      transition: "transform var(--dur-base) var(--ease-out)"
    }
  })), label);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Pagination.jsx
try { (() => {
function pages(cur, total, sib) {
  const out = [];
  const lo = Math.max(2, cur - sib),
    hi = Math.min(total - 1, cur + sib);
  out.push(1);
  if (lo > 2) out.push("…a");
  for (let i = lo; i <= hi; i++) out.push(i);
  if (hi < total - 1) out.push("…b");
  if (total > 1) out.push(total);
  return out;
}
function Pagination({
  page = 1,
  total = 1,
  onChange,
  siblings = 1,
  style
}) {
  if (total <= 1) return null;
  const go = p => {
    if (p >= 1 && p <= total && p !== page && onChange) onChange(p);
  };
  const base = {
    height: 40,
    minWidth: 40,
    padding: "0 12px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: "var(--radius-sm)",
    border: "1px solid transparent",
    background: "transparent",
    fontFamily: "var(--font-mono)",
    fontSize: 14,
    fontWeight: 500,
    color: "var(--fg-1)",
    cursor: "pointer",
    transition: "background var(--dur-fast), color var(--dur-fast), border-color var(--dur-fast)"
  };
  const Btn = ({
    p,
    children,
    label,
    disabled,
    active
  }) => {
    const [h, setH] = React.useState(false);
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      "aria-label": label,
      "aria-current": active ? "page" : undefined,
      disabled: disabled,
      onClick: () => go(p),
      onMouseEnter: () => setH(true),
      onMouseLeave: () => setH(false),
      style: {
        ...base,
        background: active ? "var(--ink-950)" : h && !disabled ? "var(--ink-100)" : "transparent",
        color: active ? "var(--accent-on-strong)" : disabled ? "var(--fg-disabled)" : "var(--fg-1)",
        borderColor: active ? "var(--ink-950)" : "transparent",
        cursor: disabled ? "not-allowed" : "pointer"
      }
    }, children);
  };
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Ph\xE2n trang",
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      flexWrap: "wrap",
      ...style
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    p: page - 1,
    label: "Trang tr\u01B0\u1EDBc",
    disabled: page <= 1
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-left",
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 14,
      fontWeight: 600
    }
  }, "Tr\u01B0\u1EDBc")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      alignItems: "center"
    }
  }, pages(page, total, siblings).map(p => typeof p === "number" ? /*#__PURE__*/React.createElement(Btn, {
    key: p,
    p: p,
    label: "Trang " + p,
    active: p === page
  }, String(p).padStart(2, "0")) : /*#__PURE__*/React.createElement("span", {
    key: p,
    style: {
      ...base,
      cursor: "default",
      color: "var(--fg-3)"
    }
  }, "\u2026"))), /*#__PURE__*/React.createElement(Btn, {
    p: page + 1,
    label: "Trang sau",
    disabled: page >= total
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 14,
      fontWeight: 600
    }
  }, "Sau"), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-right",
    size: 16
  })));
}
Object.assign(__ds_scope, { Pagination });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Pagination.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  style
}) {
  const first = items[0] && (typeof items[0] === "string" ? items[0] : items[0].value);
  const [inner, setInner] = React.useState(defaultValue ?? first);
  const cur = value ?? inner;
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: "flex",
      gap: 28,
      borderBottom: "1px solid var(--border-1)",
      overflowX: "auto",
      ...style
    }
  }, items.map(it => {
    const v = typeof it === "string" ? it : it.value;
    const l = typeof it === "string" ? it : it.label;
    const on = v === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      role: "tab",
      "aria-selected": on,
      onClick: () => {
        setInner(v);
        onChange && onChange(v);
      },
      style: {
        position: "relative",
        background: "none",
        border: 0,
        padding: "12px 0 14px",
        font: "inherit",
        fontFamily: "var(--font-body)",
        fontSize: 15,
        fontWeight: on ? 600 : 500,
        color: on ? "var(--fg-1)" : "var(--fg-2)",
        cursor: "pointer",
        whiteSpace: "nowrap"
      }
    }, l, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: -1,
        height: 3,
        background: on ? "var(--brand)" : "transparent",
        transition: "background var(--dur-fast)"
      }
    }));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function Card({
  variant = "outline",
  interactive = false,
  padding = 24,
  onClick,
  children,
  style
}) {
  const [h, setH] = React.useState(false);
  const lift = interactive && h;
  const V = {
    outline: {
      background: "var(--surface-card)",
      border: `1px solid ${lift ? "var(--ink-950)" : "var(--border-1)"}`
    },
    sunken: {
      background: "var(--surface-sunken)",
      border: "1px solid transparent"
    },
    ink: {
      background: "var(--surface-inverse)",
      color: "var(--fg-inverse-1)",
      border: "1px solid var(--surface-inverse)"
    },
    brand: {
      background: "var(--brand)",
      color: "var(--on-brand)",
      border: "1px solid var(--brand)"
    }
  }[variant];
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      borderRadius: "var(--radius-md)",
      padding,
      ...V,
      boxShadow: lift ? "var(--shadow-2)" : "none",
      transform: lift ? "translateY(-2px)" : "none",
      transition: "transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base)",
      cursor: interactive ? "pointer" : "default",
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Dialog.jsx
try { (() => {
function Dialog({
  open = true,
  title,
  children,
  footer,
  onClose,
  width = 520,
  inline = false
}) {
  if (!open) return null;
  const panel = /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    style: {
      width: "100%",
      maxWidth: width,
      background: "var(--surface-card)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-3)",
      overflow: "hidden",
      fontFamily: "var(--font-body)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 16,
      padding: "22px 24px 0"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontVariationSettings: '"wdth" 112',
      fontSize: 22,
      fontWeight: 600,
      letterSpacing: "-0.02em",
      margin: 0
    }
  }, title), onClose && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    label: "\u0110\xF3ng",
    variant: "ghost",
    size: "sm",
    onClick: onClose
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 24px 24px",
      color: "var(--fg-2)",
      fontSize: 15,
      lineHeight: 1.6
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 10,
      padding: "16px 24px",
      borderTop: "1px solid var(--border-1)",
      background: "var(--surface-sunken)"
    }
  }, footer));
  if (inline) return panel;
  return /*#__PURE__*/React.createElement("div", {
    onClick: e => {
      if (e.target === e.currentTarget && onClose) onClose();
    },
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 100,
      background: "var(--scrim)",
      backdropFilter: "blur(4px)",
      display: "grid",
      placeItems: "center",
      padding: 20
    }
  }, panel);
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Toast.jsx
try { (() => {
const T = {
  info: ["info", "var(--fg-inverse-2)"],
  success: ["circle-check", "var(--accent-on-strong)"],
  danger: ["circle-alert", "#F08C78"]
};
function Toast({
  tone = "success",
  title,
  children,
  onClose,
  style
}) {
  const [ic, c] = T[tone] || T.info;
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: "flex",
      gap: 12,
      alignItems: "flex-start",
      width: "100%",
      maxWidth: 380,
      padding: "14px 16px",
      background: "var(--ink-950)",
      color: "var(--fg-inverse-1)",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-3)",
      fontFamily: "var(--font-body)",
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: ic,
    size: 20,
    color: c,
    style: {
      marginTop: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 600
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--fg-inverse-2)",
      marginTop: 2
    }
  }, children)), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "\u0110\xF3ng",
    style: {
      background: "none",
      border: 0,
      padding: 2,
      color: "var(--fg-inverse-2)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 16
  })));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Toast.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Tooltip.jsx
try { (() => {
function Tooltip({
  text,
  placement = "top",
  align = "center",
  children,
  open
}) {
  const [h, setH] = React.useState(false);
  const show = open ?? h;
  const pos = placement === "bottom" ? {
    top: "calc(100% + 8px)"
  } : {
    bottom: "calc(100% + 8px)"
  };
  return /*#__PURE__*/React.createElement("span", {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      position: "relative",
      display: "inline-flex"
    }
  }, children, /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: "absolute",
      ...(align === "end" ? {
        right: 0
      } : align === "start" ? {
        left: 0
      } : {
        left: "50%"
      }),
      ...pos,
      visibility: show ? "visible" : "hidden",
      transform: `translateX(${align === "center" ? "-50%" : "0"}) translateY(${show ? 0 : 4}px)`,
      opacity: show ? 1 : 0,
      pointerEvents: "none",
      transition: "opacity var(--dur-fast), transform var(--dur-fast) var(--ease-out)",
      background: "var(--ink-950)",
      color: "var(--fg-inverse-1)",
      fontFamily: "var(--font-body)",
      fontSize: 13,
      lineHeight: 1.4,
      padding: "6px 10px",
      borderRadius: "var(--radius-sm)",
      whiteSpace: "nowrap",
      zIndex: 50
    }
  }, text));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Tooltip.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/About.jsx
try { (() => {
const {
  Card: ACard,
  Badge: ABadge,
  Button: AB,
  Icon: AIc
} = window.LAPBEEDesignSystem_7efb49;
const PRINCIPLES = [["receipt-text", "Báo giá trước", "Không sửa khi bạn chưa đồng ý chi phí.", "Phiếu báo giá có chữ ký"], ["message-square-text", "Nói rõ lỗi", "Giải thích nguyên nhân bằng ngôn ngữ dễ hiểu, kèm hình ảnh linh kiện.", "Ảnh linh kiện trước & sau"], ["shield-check", "Bảo hành thật", "Phiếu bảo hành bằng văn bản, ghi rõ linh kiện và thời hạn.", "Bảo hành bằng văn bản"]];
function Team({
  go
}) {
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(PageHero, {
    eyebrow: "\u0110\u1ED9i ng\u0169",
    title: "Nh\u1EEFng ng\u01B0\u1EDDi gi\u1EEF cho m\xE1y c\u1EE7a b\u1EA1n ho\u1EA1t \u0111\u1ED9ng."
  }, "K\u1EF9 thu\u1EADt vi\xEAn LAPBEE l\xE0m vi\u1EC7c theo chuy\xEAn m\xF4n: m\u1ED7i thi\u1EBFt b\u1ECB \u0111\u1EBFn tay ng\u01B0\u1EDDi hi\u1EC3u n\xF3 nh\u1EA5t."), /*#__PURE__*/React.createElement("section", {
    className: "lb-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lb-grid-4"
  }, LB_DATA.team.map(m => /*#__PURE__*/React.createElement("div", {
    key: m.name,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Placeholder, {
    label: "CH\xC2N DUNG",
    ratio: "4/5"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 19
    }
  }, m.name), /*#__PURE__*/React.createElement("span", {
    className: "lb-label"
  }, m.since)), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--fg-2)",
      fontSize: 14,
      marginTop: -6
    }
  }, m.role))))), /*#__PURE__*/React.createElement("section", {
    className: "lb-pr"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lb-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lb-pr-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "lb-label",
    style: {
      color: "var(--band-accent)"
    }
  }, "Nguy\xEAn t\u1EAFc"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--type-h1)",
      letterSpacing: "-0.03em",
      lineHeight: 1.04,
      marginTop: 16
    }
  }, "C\xE1ch ch\xFAng t\xF4i", /*#__PURE__*/React.createElement("br", null), "l\xE0m vi\u1EC7c.")), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--band-fg-2)",
      fontSize: "var(--type-lead)",
      maxWidth: 420
    }
  }, "Ba cam k\u1EBFt m\u1ECDi k\u1EF9 thu\u1EADt vi\xEAn LAPBEE gi\u1EEF v\u1EDBi t\u1EEBng chi\u1EBFc m\xE1y, t\u1EEB 2012 \u0111\u1EBFn nay.")), /*#__PURE__*/React.createElement("div", {
    className: "lb-pr-grid"
  }, PRINCIPLES.map(([ic, t, b, proof], i) => /*#__PURE__*/React.createElement("div", {
    key: t,
    className: "lb-pr-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lb-pr-top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lb-pr-ic"
  }, /*#__PURE__*/React.createElement(AIc, {
    name: ic,
    size: 28
  })), /*#__PURE__*/React.createElement("span", {
    className: "lb-pr-n"
  }, "0", i + 1)), /*#__PURE__*/React.createElement("h3", {
    className: "lb-pr-t"
  }, t), /*#__PURE__*/React.createElement("p", {
    className: "lb-pr-b"
  }, b), /*#__PURE__*/React.createElement("div", {
    className: "lb-pr-proof"
  }, /*#__PURE__*/React.createElement(AIc, {
    name: "check",
    size: 16
  }), proof)))))));
}
Object.assign(window, {
  Team
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/About.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Booking.jsx
try { (() => {
const {
  Input: BI,
  Select: BS,
  Radio: BR,
  Checkbox: BC,
  Button: BB,
  Dialog: BD,
  Card: BCard,
  Icon: BIc
} = window.LAPBEEDesignSystem_7efb49;
function Booking({
  go
}) {
  const [done, setDone] = React.useState(false);
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(PageHero, {
    eyebrow: "\u0110\u1EB7t l\u1ECBch",
    title: "\u0110\u1EB7t l\u1ECBch s\u1EEDa ch\u1EEFa."
  }, "\u0110\u1EC3 l\u1EA1i th\xF4ng tin, k\u1EF9 thu\u1EADt vi\xEAn s\u1EBD g\u1ECDi l\u1EA1i trong 15 ph\xFAt (gi\u1EDD l\xE0m vi\u1EC7c)."), /*#__PURE__*/React.createElement("section", {
    className: "lb-container lb-book"
  }, /*#__PURE__*/React.createElement(BCard, {
    padding: "clamp(20px,4vw,36px)"
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setDone(true);
    },
    style: {
      display: "grid",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(BR, {
    direction: "row",
    defaultValue: "C\xE1 nh\xE2n",
    options: ["Cá nhân", "Doanh nghiệp"]
  }), /*#__PURE__*/React.createElement("div", {
    className: "lb-grid-2"
  }, /*#__PURE__*/React.createElement(BI, {
    label: "H\u1ECD v\xE0 t\xEAn",
    placeholder: "Nguy\u1EC5n V\u0103n A"
  }), /*#__PURE__*/React.createElement(BI, {
    label: "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i",
    icon: "phone",
    placeholder: "09xx xxx xxx"
  })), /*#__PURE__*/React.createElement(BS, {
    label: "Thi\u1EBFt b\u1ECB",
    placeholder: "Ch\u1ECDn thi\u1EBFt b\u1ECB",
    options: ["Laptop", "MacBook", "PC", "Máy tính bảng", "Điện thoại", "Khác"]
  }), /*#__PURE__*/React.createElement(BI, {
    label: "M\xF4 t\u1EA3 l\u1ED7i",
    multiline: true,
    rows: 4,
    placeholder: "M\xE1y kh\xF4ng l\xEAn ngu\u1ED3n, m\xE0n h\xECnh s\u1ECDc\u2026"
  }), /*#__PURE__*/React.createElement(BC, {
    label: "T\xF4i c\u1EA7n xu\u1EA5t ho\xE1 \u0111\u01A1n VAT"
  }), /*#__PURE__*/React.createElement(BB, {
    type: "submit",
    size: "lg",
    iconRight: "arrow-right"
  }, "G\u1EEDi y\xEAu c\u1EA7u"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 20,
      alignContent: "start"
    }
  }, [["phone", "Hotline", LB_DATA.phone], ["map-pin", "Địa chỉ", LB_DATA.address], ["clock", "Giờ làm việc", LB_DATA.hours]].map(([i, l, v]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      display: "flex",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(BIc, {
    name: i,
    size: 22
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "lb-label"
  }, l), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4
    }
  }, v)))), /*#__PURE__*/React.createElement(Placeholder, {
    label: "B\u1EA2N \u0110\u1ED2",
    ratio: "4/3"
  }))), /*#__PURE__*/React.createElement(BD, {
    open: done,
    title: "\u0110\xE3 nh\u1EADn y\xEAu c\u1EA7u",
    onClose: () => setDone(false),
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(BB, {
      variant: "ghost",
      onClick: () => {
        setDone(false);
        go("posts");
      }
    }, "\u0110\u1ECDc b\xE0i \u0111\u0103ng"), /*#__PURE__*/React.createElement(BB, {
      onClick: () => {
        setDone(false);
        go("home");
      }
    }, "V\u1EC1 trang ch\u1EE7"))
  }, "M\xE3 phi\u1EBFu c\u1EE7a b\u1EA1n l\xE0 ", /*#__PURE__*/React.createElement("b", {
    style: {
      fontFamily: "var(--font-mono)",
      color: "var(--fg-1)"
    }
  }, "LB-0428"), ". K\u1EF9 thu\u1EADt vi\xEAn s\u1EBD g\u1ECDi l\u1EA1i \u0111\u1EC3 x\xE1c nh\u1EADn l\u1ECBch h\u1EB9n."));
}
Object.assign(window, {
  Booking
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Booking.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Home.jsx
try { (() => {
const {
  Button: HB,
  Card: HCard,
  Icon: HIcon,
  Badge: HBadge
} = window.LAPBEEDesignSystem_7efb49;
function PostCard({
  p,
  go,
  large
}) {
  return /*#__PURE__*/React.createElement(HCard, {
    interactive: true,
    padding: 0,
    onClick: () => go("post", p.id),
    style: {
      overflow: "hidden",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(Placeholder, {
    label: "\u1EA2NH B\xC0I VI\u1EBET",
    ratio: large ? "16/9" : "3/2",
    style: {
      borderRadius: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      display: "flex",
      flexDirection: "column",
      gap: 10,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(HBadge, {
    tone: p.cat === "Khuyến mãi" ? "brand" : "neutral"
  }, p.cat), /*#__PURE__*/React.createElement("span", {
    className: "lb-label"
  }, p.date)), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: large ? "var(--type-h2)" : 20,
      lineHeight: 1.2
    }
  }, p.title), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--fg-2)",
      fontSize: 15
    }
  }, p.excerpt), /*#__PURE__*/React.createElement("span", {
    className: "lb-label",
    style: {
      marginTop: "auto",
      paddingTop: 6
    }
  }, p.read, " \u0111\u1ECDc")));
}
function Home({
  go
}) {
  const D = LB_DATA;
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    className: "lb-container lb-hero",
    style: {
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "lb-enter"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lb-label lb-hero-eyebrow",
    style: {
      marginBottom: 24,
      display: "flex",
      gap: 10,
      alignItems: "center",
      "--d": 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      flex: "none",
      background: "var(--brand)",
      borderRadius: 99
    }
  }), "\u0110ang nh\u1EADn m\xE1y \xB7 ", D.hours), /*#__PURE__*/React.createElement("h1", {
    className: "lb-hero-title",
    style: {
      fontSize: "var(--type-display)",
      lineHeight: 1,
      letterSpacing: "-0.035em",
      "--d": 1
    }
  }, "M\xE1y h\u1ECFng,", /*#__PURE__*/React.createElement("br", null), "\u0111\xE3 c\xF3 ", /*#__PURE__*/React.createElement("span", {
    style: {
      background: "var(--brand)",
      color: "var(--on-brand)",
      padding: "0 .12em",
      borderRadius: 4
    }
  }, "LAPBEE"), "."), /*#__PURE__*/React.createElement("p", {
    className: "lb-hero-lead",
    style: {
      fontSize: "var(--type-lead)",
      color: "var(--fg-2)",
      marginTop: 28,
      maxWidth: 560,
      "--d": 2
    }
  }, "Trung t\xE2m s\u1EEDa ch\u1EEFa thi\u1EBFt b\u1ECB c\xF4ng ngh\u1EC7 v\xE0 m\xE1y t\xEDnh uy t\xEDn, \u0111\u01B0\u1EE3c nhi\u1EC1u s\u1EF1 tin t\u01B0\u1EDFng, c\xF3 h\u01A1n 14 n\u0103m kinh nghi\u1EC7m, \u0111\u01B0\u1EE3c th\xE0nh l\u1EADp t\u1EEB n\u0103m 2012."), /*#__PURE__*/React.createElement("div", {
    className: "lb-hero-ctas",
    style: {
      display: "flex",
      gap: 12,
      marginTop: 36,
      flexWrap: "wrap",
      "--d": 3
    }
  }, /*#__PURE__*/React.createElement(HB, {
    size: "lg",
    iconRight: "arrow-right",
    onClick: () => go("book")
  }, "\u0110\u1EB7t l\u1ECBch s\u1EEDa ch\u1EEFa"), /*#__PURE__*/React.createElement(HB, {
    size: "lg",
    variant: "outline",
    onClick: () => window.lbScrollTo("#svc", {
      offset: -24
    })
  }, "Xem d\u1ECBch v\u1EE5"))), /*#__PURE__*/React.createElement("div", {
    className: "lb-hero-media"
  }, /*#__PURE__*/React.createElement(Placeholder, {
    label: "\u1EA2NH X\u01AF\u1EDENG S\u1EECA CH\u1EEEA",
    ratio: "4/5"
  }), /*#__PURE__*/React.createElement("div", {
    className: "lb-hero-chip"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lb-hero-chip-n",
    style: {
      fontFamily: "var(--font-mono)",
      fontWeight: 500,
      letterSpacing: "-0.04em",
      lineHeight: 1
    }
  }, "14+"), /*#__PURE__*/React.createElement("span", {
    className: "lb-hero-chip-t",
    style: {
      color: "var(--fg-inverse-2)"
    }
  }, "n\u0103m kinh nghi\u1EC7m", /*#__PURE__*/React.createElement("br", null), "t\u1EEB LAPPY 2012")))), /*#__PURE__*/React.createElement("section", {
    className: "lb-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lb-stats"
  }, [["2012", "Thành lập với tên LAPPY"], ["14+", "Năm kinh nghiệm"], ["0đ", "Phí kiểm tra, báo giá"], ["Văn bản", "Phiếu bảo hành rõ ràng"]].map(([a, b]) => /*#__PURE__*/React.createElement("div", {
    key: b
  }, /*#__PURE__*/React.createElement("div", {
    className: "lb-stat-n"
  }, a), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--fg-2)"
    }
  }, b))))), /*#__PURE__*/React.createElement("section", {
    id: "svc",
    className: "lb-container lb-section"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    no: "01",
    title: "D\u1ECBch v\u1EE5",
    aside: /*#__PURE__*/React.createElement(HB, {
      variant: "ghost",
      iconRight: "arrow-up-right",
      onClick: () => go("book")
    }, "Nh\u1EADn b\xE1o gi\xE1")
  }, "M\u1ED9t n\u01A1i cho to\xE0n b\u1ED9 thi\u1EBFt b\u1ECB c\xF4ng ngh\u1EC7 c\u1EE7a b\u1EA1n v\xE0 doanh nghi\u1EC7p."), /*#__PURE__*/React.createElement("div", {
    className: "lb-grid-3"
  }, D.services.map(s => /*#__PURE__*/React.createElement(HCard, {
    key: s.title,
    interactive: true,
    padding: 28,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14,
      minHeight: 230
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement(HIcon, {
    name: s.icon,
    size: 28
  }), /*#__PURE__*/React.createElement(HIcon, {
    name: "arrow-up-right",
    size: 18,
    color: "var(--fg-3)"
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: "var(--type-h3)",
      marginTop: "auto"
    }
  }, s.title), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--fg-2)",
      fontSize: 15
    }
  }, s.desc), /*#__PURE__*/React.createElement("span", {
    className: "lb-label"
  }, s.time))))), /*#__PURE__*/React.createElement(Process, {
    go: go
  }), /*#__PURE__*/React.createElement("section", {
    className: "lb-section lb-band",
    style: {
      background: "var(--band-bg)",
      color: "var(--band-fg)",
      marginTop: "var(--section-y)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "lb-container lb-biz"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "lb-label",
    style: {
      color: "var(--band-accent)"
    }
  }, "Doanh nghi\u1EC7p"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--type-h1)",
      marginTop: 20,
      letterSpacing: "-0.03em",
      lineHeight: 1.05
    }
  }, "B\u1ED9 ph\u1EADn IT thu\xEA ngo\xE0i cho v\u0103n ph\xF2ng c\u1EE7a b\u1EA1n."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--band-fg-2)",
      marginTop: 20,
      fontSize: "var(--type-lead)",
      maxWidth: 520
    }
  }, "B\u1EA3o tr\xEC \u0111\u1ECBnh k\u1EF3, x\u1EED l\xFD s\u1EF1 c\u1ED1 t\u1EA1i ch\u1ED7 v\xE0 b\xE1o c\xE1o t\xECnh tr\u1EA1ng thi\u1EBFt b\u1ECB h\u1EB1ng th\xE1ng."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      marginTop: 32,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(HB, {
    size: "lg",
    onClick: () => go("book")
  }, "Li\xEAn h\u1EC7 t\u01B0 v\u1EA5n"), /*#__PURE__*/React.createElement(HB, {
    size: "lg",
    variant: "inverse",
    iconLeft: "phone"
  }, D.phone))), /*#__PURE__*/React.createElement("ul", {
    className: "lb-biz-list"
  }, ["Hợp đồng bảo trì theo quý hoặc năm", "Kỹ thuật viên phụ trách riêng", "Xuất hoá đơn VAT", "Ưu tiên xử lý trong ngày"].map(t => /*#__PURE__*/React.createElement("li", {
    key: t
  }, /*#__PURE__*/React.createElement(HIcon, {
    name: "check",
    size: 18,
    color: "var(--band-accent)"
  }), t))))), /*#__PURE__*/React.createElement("section", {
    className: "lb-container lb-section"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    no: "04",
    title: "B\xE0i \u0111\u0103ng m\u1EDBi",
    aside: /*#__PURE__*/React.createElement(HB, {
      variant: "outline",
      iconRight: "arrow-right",
      onClick: () => go("posts")
    }, "T\u1EA5t c\u1EA3 b\xE0i \u0111\u0103ng")
  }), /*#__PURE__*/React.createElement("div", {
    className: "lb-grid-3"
  }, D.posts.slice(0, 3).map(p => /*#__PURE__*/React.createElement(PostCard, {
    key: p.id,
    p: p,
    go: go
  })))));
}
Object.assign(window, {
  Home,
  PostCard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Journey.jsx
try { (() => {
const {
  Badge: JBadge,
  Card: JCard,
  Button: JB,
  IconButton: JIB,
  Icon: JIc
} = window.LAPBEEDesignSystem_7efb49;
function JPhoto({
  p,
  ratio
}) {
  const src = p.src || typeof LB_MOCK_IMG !== "undefined" && LB_MOCK_IMG || null;
  return /*#__PURE__*/React.createElement("figure", {
    className: "lb-jr-photo",
    "data-reveal-clip": true,
    style: {
      aspectRatio: ratio
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: p.alt || p.label || "",
    loading: "lazy"
  }) : /*#__PURE__*/React.createElement("span", {
    className: "lb-jr-photo-empty",
    "aria-hidden": "true"
  }), p.label && /*#__PURE__*/React.createElement("figcaption", {
    className: "lb-jr-cap"
  }, p.label));
}
function JPhotoList({
  ph,
  layout,
  ratios
}) {
  return /*#__PURE__*/React.createElement("ul", {
    className: "lb-jr-photos " + layout,
    role: "list"
  }, ph.map((p, k) => /*#__PURE__*/React.createElement("li", {
    key: k
  }, /*#__PURE__*/React.createElement(JPhoto, {
    p: p,
    ratio: ratios[k] || ratios[ratios.length - 1]
  }))));
}
function JGallery({
  ph
}) {
  const ref = React.useRef(null);
  const [i, setI] = React.useState(0);
  const unit = () => {
    const f = ref.current && ref.current.querySelector("figure");
    return f ? f.getBoundingClientRect().width + 12 : 1;
  };
  const step = dir => ref.current && ref.current.scrollBy({
    left: dir * unit(),
    behavior: "smooth"
  });
  const onScroll = () => ref.current && setI(Math.round(ref.current.scrollLeft / unit()));
  return /*#__PURE__*/React.createElement("div", {
    className: "lb-jr-gal",
    role: "region",
    "aria-label": "Thư viện " + ph.length + " ảnh"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "lb-jr-gal-track",
    role: "list",
    ref: ref,
    onScroll: onScroll
  }, ph.map((p, k) => /*#__PURE__*/React.createElement("li", {
    key: k
  }, /*#__PURE__*/React.createElement(JPhoto, {
    p: p,
    ratio: "4/5"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "lb-jr-gal-ctl"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lb-label",
    style: {
      color: "var(--fg-1)"
    }
  }, String(Math.min(i + 1, ph.length)).padStart(2, "0"), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg-3)"
    }
  }, "/ ", String(ph.length).padStart(2, "0"), " \u1EA3nh")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(JIB, {
    icon: "arrow-left",
    label: "\u1EA2nh tr\u01B0\u1EDBc",
    size: "sm",
    onClick: () => step(-1),
    disabled: i <= 0
  }), /*#__PURE__*/React.createElement(JIB, {
    icon: "arrow-right",
    label: "\u1EA2nh sau",
    size: "sm",
    onClick: () => step(1),
    disabled: i >= ph.length - 2
  }))));
}
function JMedia({
  t
}) {
  const ph = t.photos || [];
  if (ph.length === 0) return t.quote ? /*#__PURE__*/React.createElement("figure", {
    className: "lb-jr-quote",
    "data-reveal-clip": true
  }, /*#__PURE__*/React.createElement("span", {
    className: "lb-jr-qmark",
    "aria-hidden": "true"
  }, "\u201C"), /*#__PURE__*/React.createElement("blockquote", null, t.quote.text), /*#__PURE__*/React.createElement("figcaption", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      color: "var(--fg-1)"
    }
  }, t.quote.by), /*#__PURE__*/React.createElement("span", {
    className: "lb-label"
  }, t.quote.role, " \xB7 ", t.year))) : null;
  if (ph.length === 1) return /*#__PURE__*/React.createElement(JPhoto, {
    p: ph[0],
    ratio: "16/10"
  });
  if (ph.length === 2) return /*#__PURE__*/React.createElement(JPhotoList, {
    ph: ph,
    layout: "n2",
    ratios: ["4/5", "4/5"]
  });
  if (ph.length === 3) return /*#__PURE__*/React.createElement(JPhotoList, {
    ph: ph,
    layout: "n3",
    ratios: ["auto", "4/3", "4/3"]
  });
  return /*#__PURE__*/React.createElement(JGallery, {
    ph: ph
  });
}
function History({
  go
}) {
  const T = LB_DATA.timeline;
  const [act, setAct] = React.useState(0);
  const [prog, setProg] = React.useState(0);
  const refs = React.useRef([]);
  const wrap = React.useRef(null);
  const rail = React.useRef(null);
  React.useEffect(() => {
    const on = () => {
      const line = innerHeight * 0.45;
      let a = 0;
      refs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top < line) a = i;
      });
      setAct(a);
      const w = wrap.current;
      if (w) {
        const r = w.getBoundingClientRect();
        setProg(Math.max(0, Math.min(1, (line - r.top) / r.height)));
      }
    };
    on();
    addEventListener("scroll", on, {
      passive: true
    });
    return () => removeEventListener("scroll", on);
  }, []);
  React.useEffect(() => {
    const r = rail.current,
      b = r && r.children[act];
    if (r && b && r.scrollWidth > r.clientWidth) r.scrollTo({
      left: b.offsetLeft - r.clientWidth / 2 + b.offsetWidth / 2,
      behavior: "smooth"
    });
  }, [act]);
  const goTo = i => {
    const el = refs.current[i];
    if (!el) return;
    const y = el.getBoundingClientRect().top + scrollY - 150;
    window.lbScrollTo ? window.lbScrollTo(y) : scrollTo({
      top: y,
      behavior: "smooth"
    });
  };
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(PageHero, {
    eyebrow: "H\xE0nh tr\xECnh \xB7 2012 \u2192 2026",
    title: "T\u1EEB LAPPY \u0111\u1EBFn LAPBEE."
  }, "H\u01A1n 14 n\u0103m, m\u1ED9t c\xE1ch l\xE0m vi\u1EC7c: c\u1EA9n th\u1EADn, minh b\u1EA1ch v\xE0 t\xF4n tr\u1ECDng thi\u1EBFt b\u1ECB c\u1EE7a kh\xE1ch h\xE0ng."), /*#__PURE__*/React.createElement("div", {
    className: "lb-jr-railwrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lb-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lb-jr-rail",
    ref: rail
  }, T.map((t, i) => /*#__PURE__*/React.createElement("button", {
    key: t.year,
    onClick: () => goTo(i),
    className: "lb-jr-tick" + (i === act ? " on" : "") + (i < act ? " done" : "")
  }, /*#__PURE__*/React.createElement("span", {
    className: "lb-jr-tick-y"
  }, t.year), /*#__PURE__*/React.createElement("span", {
    className: "lb-jr-tick-t"
  }, t.title))), /*#__PURE__*/React.createElement("span", {
    className: "lb-jr-railbar",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      transform: `scaleX(${prog})`
    }
  }))))), /*#__PURE__*/React.createElement("section", {
    className: "lb-container",
    ref: wrap
  }, T.map((t, i) => {
    const flip = i % 2 === 1;
    const ph = t.photos || [];
    return /*#__PURE__*/React.createElement("article", {
      key: t.year,
      ref: el => refs.current[i] = el,
      className: "lb-jr-ch" + (flip ? " flip" : "") + (i === act ? " on" : "") + (ph.length === 0 ? " textonly" : "")
    }, /*#__PURE__*/React.createElement("div", {
      className: "lb-jr-yearcol"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lb-jr-year",
      "aria-hidden": "true"
    }, t.year)), /*#__PURE__*/React.createElement("div", {
      className: "lb-jr-body"
    }, /*#__PURE__*/React.createElement(JMedia, {
      t: t
    }), /*#__PURE__*/React.createElement("div", {
      className: "lb-jr-text"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10,
        alignItems: "center",
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "lb-label",
      style: {
        color: "var(--fg-1)"
      }
    }, "Ch\u01B0\u01A1ng ", String(i + 1).padStart(2, "0"), " \xB7 ", t.year), i === 0 && /*#__PURE__*/React.createElement(JBadge, {
      tone: "brand"
    }, "Kh\u1EDFi \u0111\u1EA7u"), i === T.length - 1 && /*#__PURE__*/React.createElement(JBadge, {
      tone: "ink"
    }, "Hi\u1EC7n t\u1EA1i")), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: "var(--type-h2)",
        marginTop: 14,
        letterSpacing: "-0.025em"
      }
    }, t.title), /*#__PURE__*/React.createElement("p", {
      style: {
        color: "var(--fg-2)",
        marginTop: 14,
        fontSize: "var(--type-lead)",
        maxWidth: 560
      }
    }, t.body))));
  })), /*#__PURE__*/React.createElement("section", {
    className: "lb-container lb-section"
  }, /*#__PURE__*/React.createElement(JCard, {
    variant: "brand",
    padding: "clamp(28px,5vw,56px)",
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 24,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--type-h2)",
      maxWidth: 620
    }
  }, "Ch\u01B0\u01A1ng ti\u1EBFp theo b\u1EAFt \u0111\u1EA7u v\u1EDBi chi\u1EBFc m\xE1y c\u1EE7a b\u1EA1n."), /*#__PURE__*/React.createElement(JB, {
    variant: "secondary",
    size: "lg",
    iconRight: "arrow-right",
    onClick: () => go("book")
  }, "\u0110\u1EB7t l\u1ECBch s\u1EEDa"))));
}
Object.assign(window, {
  History
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Journey.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Posts.jsx
try { (() => {
const {
  Tag: PTag,
  Input: PInput,
  Button: PB,
  Badge: PBadge,
  IconButton: PIB,
  Tooltip: PTip
} = window.LAPBEEDesignSystem_7efb49;
const PER_PAGE = 6;
function Posts({
  go
}) {
  const all = LB_DATA.posts;
  const [cat, setCat] = React.useState("Tất cả");
  const [q, setQ] = React.useState("");
  const [qd, setQd] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [view, setView] = React.useState({
    cat: "Tất cả",
    q: "",
    page: 1
  });
  const [phase, setPhase] = React.useState("in");
  const topRef = React.useRef(null);
  const timer = React.useRef(null);
  React.useEffect(() => {
    const t = setTimeout(() => setQd(q), 280);
    return () => clearTimeout(t);
  }, [q]);
  React.useEffect(() => {
    if (view.cat === cat && view.q === qd && view.page === page) return;
    setPhase("out");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setView({
        cat,
        q: qd,
        page
      });
      setPhase("in");
    }, 180);
  }, [cat, qd, page]);
  const filt = all.filter(p => (view.cat === "Tất cả" || p.cat === view.cat) && p.title.toLowerCase().includes(view.q.toLowerCase()));
  const pages = Math.max(1, Math.ceil(filt.length / PER_PAGE));
  const slice = filt.slice((view.page - 1) * PER_PAGE, view.page * PER_PAGE);
  const feat = view.page === 1 ? slice.find(p => p.featured) : null;
  const rest = slice.filter(p => p !== feat);
  const pickCat = c => {
    if (c === cat) return;
    setCat(c);
    setPage(1);
  };
  const pickPage = n => {
    setPage(n);
    window.lbScrollTo ? window.lbScrollTo(0) : scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  const Pager = window.LAPBEEDesignSystem_7efb49.Pagination || (() => null);
  const from = filt.length ? (view.page - 1) * PER_PAGE + 1 : 0,
    to = Math.min(view.page * PER_PAGE, filt.length);
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(PageHero, {
    eyebrow: "B\xE0i \u0111\u0103ng",
    title: "Ki\u1EBFn th\u1EE9c, tin t\u1EE9c v\xE0 m\u1EB9o t\u1EEB x\u01B0\u1EDFng s\u1EEDa ch\u1EEFa."
  }), /*#__PURE__*/React.createElement("section", {
    className: "lb-container",
    ref: topRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "lb-filter"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, LB_DATA.categories.map(c => /*#__PURE__*/React.createElement(PTag, {
    key: c,
    selected: cat === c,
    count: c === "Tất cả" ? all.length : all.filter(p => p.cat === c).length,
    onClick: () => pickCat(c)
  }, c))), /*#__PURE__*/React.createElement(PInput, {
    icon: "search",
    placeholder: "T\xECm b\xE0i vi\u1EBFt",
    value: q,
    onChange: e => {
      setQ(e.target.value);
      setPage(1);
    },
    style: {
      width: "100%",
      maxWidth: 300
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "lb-postcount"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lb-label",
    style: {
      color: "var(--fg-1)"
    }
  }, view.cat), /*#__PURE__*/React.createElement("span", {
    className: "lb-label"
  }, filt.length ? from + "–" + to + " / " + filt.length + " bài viết" : "0 bài viết")), /*#__PURE__*/React.createElement("div", {
    className: "lb-postlist " + phase
  }, /*#__PURE__*/React.createElement("div", {
    key: view.cat + "|" + view.q + "|" + view.page
  }, feat && /*#__PURE__*/React.createElement("div", {
    className: "lb-post-item",
    style: {
      "--i": 0
    }
  }, /*#__PURE__*/React.createElement(PostCard, {
    p: feat,
    go: go,
    large: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "lb-grid-3",
    style: {
      marginTop: feat ? 24 : 0
    }
  }, rest.map((p, k) => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    className: "lb-post-item",
    style: {
      "--i": Math.min(k + (feat ? 1 : 0), 5),
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(PostCard, {
    p: p,
    go: go
  })))), !filt.length && /*#__PURE__*/React.createElement("p", {
    className: "lb-post-item",
    style: {
      color: "var(--fg-2)",
      padding: "48px 0"
    }
  }, "Kh\xF4ng t\xECm th\u1EA5y b\xE0i vi\u1EBFt ph\xF9 h\u1EE3p."))), /*#__PURE__*/React.createElement(Pager, {
    page: page,
    total: pages,
    onChange: pickPage,
    style: {
      marginTop: 40,
      paddingTop: 20,
      borderTop: "1px solid var(--border-1)"
    }
  })));
}
function Post({
  id,
  go,
  toast
}) {
  const p = LB_DATA.posts.find(x => x.id === id) || LB_DATA.posts[0];
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("article", {
    className: "lb-container",
    style: {
      maxWidth: "calc(var(--container-narrow) + 2 * var(--gutter))",
      paddingTop: 48
    }
  }, /*#__PURE__*/React.createElement(PB, {
    variant: "ghost",
    size: "sm",
    iconLeft: "arrow-left",
    onClick: () => go("posts")
  }, "B\xE0i \u0111\u0103ng"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center",
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement(PBadge, null, p.cat), /*#__PURE__*/React.createElement("span", {
    className: "lb-label"
  }, p.date, " \xB7 ", p.read, " \u0111\u1ECDc")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--type-h1)",
      letterSpacing: "-0.03em",
      lineHeight: 1.06,
      marginTop: 20
    }
  }, p.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--type-lead)",
      color: "var(--fg-2)",
      marginTop: 20
    }
  }, p.excerpt), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderTop: "1px solid var(--border-1)",
      borderBottom: "1px solid var(--border-1)",
      padding: "14px 0",
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14
    }
  }, "B\u1EDFi ", /*#__PURE__*/React.createElement("b", null, "\u0110\u1ED9i k\u1EF9 thu\u1EADt LAPBEE")), /*#__PURE__*/React.createElement(PTip, {
    text: "Sao ch\xE9p li\xEAn k\u1EBFt",
    align: "end"
  }, /*#__PURE__*/React.createElement(PIB, {
    icon: "link",
    label: "Sao ch\xE9p li\xEAn k\u1EBFt",
    variant: "ghost",
    size: "sm",
    onClick: () => toast("Đã sao chép liên kết")
  }))), /*#__PURE__*/React.createElement(Placeholder, {
    label: "\u1EA2NH MINH HO\u1EA0",
    style: {
      marginTop: 32
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "lb-prose"
  }, /*#__PURE__*/React.createElement("p", null, "N\u1ED9i dung b\xE0i vi\u1EBFt m\u1EABu. \u0110o\u1EA1n v\u0103n d\xF9ng Be Vietnam Pro 17/1.7, \u0111\u1ED9 r\u1ED9ng t\u1ED1i \u0111a 680px \u0111\u1EC3 d\u1EC5 \u0111\u1ECDc tr\xEAn c\u1EA3 m\xE1y t\xEDnh v\xE0 \u0111i\u1EC7n tho\u1EA1i."), /*#__PURE__*/React.createElement("h2", null, "Ti\xEAu \u0111\u1EC1 ph\u1EE5 trong b\xE0i"), /*#__PURE__*/React.createElement("p", null, "M\u1ED7i b\xE0i vi\u1EBFt n\xEAn k\u1EBFt th\xFAc b\u1EB1ng m\u1ED9t l\u1EDDi m\u1EDDi h\xE0nh \u0111\u1ED9ng r\xF5 r\xE0ng: \u0111\u1EB7t l\u1ECBch ki\u1EC3m tra, g\u1ECDi hotline ho\u1EB7c \u0111\u1ECDc b\xE0i li\xEAn quan.")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-sunken)",
      borderRadius: "var(--radius-md)",
      padding: 28,
      marginTop: 48,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 20,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 20
    }
  }, "M\xE1y b\u1EA1n c\xF3 d\u1EA5u hi\u1EC7u t\u01B0\u01A1ng t\u1EF1?"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--fg-2)",
      fontSize: 15,
      marginTop: 4
    }
  }, "Ki\u1EC3m tra v\xE0 b\xE1o gi\xE1 mi\u1EC5n ph\xED.")), /*#__PURE__*/React.createElement(PB, {
    iconRight: "arrow-right",
    onClick: () => go("book")
  }, "\u0110\u1EB7t l\u1ECBch"))));
}
Object.assign(window, {
  Posts,
  Post
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Posts.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Process.jsx
try { (() => {
const {
  Icon: PrIcon,
  Button: PrB
} = window.LAPBEEDesignSystem_7efb49;
const STEP_META = [["phone-call", "~ 5 phút", "Gọi hotline, nhắn tin hoặc mang máy trực tiếp đến trung tâm."], ["scan-search", "0đ · miễn phí", "Báo giá bằng văn bản, kèm nguyên nhân lỗi."], ["wrench", "Theo mã phiếu", "Tra cứu tiến độ bất kỳ lúc nào."], ["shield-check", "Bảo hành văn bản", "Ghi rõ linh kiện và thời hạn."]];
function Process({
  go
}) {
  const steps = LB_DATA.steps;
  const [act, setAct] = React.useState(0);
  const [prog, setProg] = React.useState(0);
  const listRef = React.useRef(null);
  const itemRefs = React.useRef([]);
  React.useEffect(() => {
    const on = () => {
      const mid = innerHeight * 0.5;
      let best = 0,
        bd = 1e9;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bd) {
          bd = d;
          best = i;
        }
      });
      setAct(best);
      const l = listRef.current;
      if (l) {
        const r = l.getBoundingClientRect();
        setProg(Math.max(0, Math.min(1, (mid - r.top) / r.height)));
      }
    };
    on();
    addEventListener("scroll", on, {
      passive: true
    });
    addEventListener("resize", on);
    return () => {
      removeEventListener("scroll", on);
      removeEventListener("resize", on);
    };
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    className: "lb-container lb-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lb-proc"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lb-proc-side"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lb-proc-sticky"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lb-label",
    style: {
      color: "var(--fg-1)"
    }
  }, "Quy tr\xECnh"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--type-h1)",
      letterSpacing: "-0.03em",
      lineHeight: 1.04,
      marginTop: 16
    }
  }, "B\u1ED1n b\u01B0\u1EDBc,", /*#__PURE__*/React.createElement("br", null), "kh\xF4ng b\u1EA5t ng\u1EDD."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--fg-2)",
      marginTop: 16,
      maxWidth: 380
    }
  }, "B\u1EA1n lu\xF4n bi\u1EBFt m\xE1y m\xECnh \u0111ang \u1EDF \u0111\xE2u v\xE0 chi ph\xED l\xE0 bao nhi\xEAu."), /*#__PURE__*/React.createElement("div", {
    className: "lb-proc-big",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    key: act,
    className: "lb-proc-num"
  }, "0", act + 1), /*#__PURE__*/React.createElement("span", {
    className: "lb-proc-of"
  }, "/ 0", steps.length)), /*#__PURE__*/React.createElement("div", {
    className: "lb-proc-bar"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      transform: `scaleX(${prog})`
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "lb-proc-cta"
  }, /*#__PURE__*/React.createElement(PrB, {
    iconRight: "arrow-right",
    onClick: () => go("book")
  }, "B\u1EAFt \u0111\u1EA7u b\u01B0\u1EDBc 1")))), /*#__PURE__*/React.createElement("ol", {
    className: "lb-proc-list",
    ref: listRef
  }, /*#__PURE__*/React.createElement("span", {
    className: "lb-proc-rail",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      transform: `scaleY(${prog})`
    }
  })), steps.map(([t, b], i) => {
    const [ic, meta, extra] = STEP_META[i] || [];
    const on = i === act,
      done = i < act;
    return /*#__PURE__*/React.createElement("li", {
      key: t,
      ref: el => itemRefs.current[i] = el,
      className: "lb-proc-item" + (on ? " on" : "") + (done ? " done" : "")
    }, /*#__PURE__*/React.createElement("span", {
      className: "lb-proc-dot"
    }, done ? /*#__PURE__*/React.createElement(PrIcon, {
      name: "check",
      size: 16
    }) : /*#__PURE__*/React.createElement("span", null, i + 1)), /*#__PURE__*/React.createElement("div", {
      className: "lb-proc-card"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "lb-label"
    }, "B\u01B0\u1EDBc 0", i + 1), /*#__PURE__*/React.createElement("span", {
      className: "lb-proc-meta"
    }, meta)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 18,
        alignItems: "flex-start",
        marginTop: 22
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "lb-proc-ic"
    }, /*#__PURE__*/React.createElement(PrIcon, {
      name: ic,
      size: 26
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: "clamp(24px,2.6vw,34px)",
        letterSpacing: "-0.025em",
        lineHeight: 1.1
      }
    }, t), /*#__PURE__*/React.createElement("p", {
      style: {
        color: "var(--fg-2)",
        marginTop: 12,
        fontSize: 17,
        maxWidth: 440
      }
    }, b, " ", extra)))));
  }))));
}
Object.assign(window, {
  Process
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Process.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Shell.jsx
try { (() => {
const {
  Wordmark,
  Button,
  IconButton,
  Icon
} = window.LAPBEEDesignSystem_7efb49;
const NAV = [["home", "Trang chủ", "Dịch vụ & quy trình"], ["team", "Đội ngũ", "Những người sửa máy cho bạn"], ["history", "Hành trình", "Từ LAPPY 2012 đến nay"], ["posts", "Bài đăng", "Mẹo, tin tức, hướng dẫn"]];
function ThemeToggle() {
  const [dark, setDark] = React.useState(document.documentElement.dataset.theme === "dark");
  const toggle = e => {
    const next = !dark;
    const apply = () => {
      document.documentElement.dataset.theme = next ? "dark" : "light";
      localStorage.setItem("lb-theme", next ? "dark" : "light");
      setDark(next);
    };
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) {
      document.documentElement.classList.add("lb-theme-fade");
      apply();
      setTimeout(() => document.documentElement.classList.remove("lb-theme-fade"), 400);
      return;
    }
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2,
      y = r.top + r.height / 2;
    const R = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const vt = document.startViewTransition(() => ReactDOM.flushSync ? ReactDOM.flushSync(apply) : apply());
    vt.ready.then(() => document.documentElement.animate({
      clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${R}px at ${x}px ${y}px)`]
    }, {
      duration: 650,
      easing: "cubic-bezier(.16,1,.3,1)",
      pseudoElement: "::view-transition-new(root)"
    }));
  };
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "lb-theme-btn",
    onClick: toggle,
    "aria-label": dark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối",
    title: dark ? "Giao diện sáng" : "Giao diện tối",
    "aria-pressed": dark
  }, /*#__PURE__*/React.createElement("span", {
    className: "moon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "moon",
    size: 18
  })), /*#__PURE__*/React.createElement("span", {
    className: "sun"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sun",
    size: 18
  })));
}
function isOpenNow() {
  const h = new Date().getHours();
  return h >= 8 && h < 20;
}
function MobileMenu({
  open,
  page,
  nav,
  close
}) {
  const [mounted, setMounted] = React.useState(open);
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setShow(true)));
    } else {
      setShow(false);
      const t = setTimeout(() => setMounted(false), 380);
      return () => clearTimeout(t);
    }
  }, [open]);
  React.useEffect(() => {
    if (!open) return;
    const L = window.__lenis;
    L && L.stop();
    const y = window.scrollY;
    const b = document.body,
      h = document.documentElement;
    const saved = {
      pos: b.style.position,
      top: b.style.top,
      w: b.style.width,
      ov: h.style.overflow
    };
    h.style.overflow = "hidden";
    b.style.position = "fixed";
    b.style.top = -y + "px";
    b.style.width = "100%";
    const sheet = () => document.querySelector(".lb-mm-sheet");
    const block = e => {
      const sh = sheet();
      if (!sh || !sh.contains(e.target)) {
        e.preventDefault();
        return;
      }
      if (sh.scrollHeight <= sh.clientHeight) e.preventDefault();
    };
    const onKey = e => {
      if (e.key === "Escape") close();
    };
    const onResize = () => {
      if (innerWidth > 1024) close();
    };
    addEventListener("keydown", onKey);
    addEventListener("resize", onResize);
    document.addEventListener("touchmove", block, {
      passive: false
    });
    document.addEventListener("wheel", block, {
      passive: false
    });
    return () => {
      document.removeEventListener("touchmove", block);
      document.removeEventListener("wheel", block);
      b.style.position = saved.pos;
      b.style.top = saved.top;
      b.style.width = saved.w;
      h.style.overflow = saved.ov;
      window.scrollTo(0, y);
      if (L) {
        L.scrollTo(y, {
          immediate: true,
          force: true
        });
        L.start();
      }
      removeEventListener("keydown", onKey);
      removeEventListener("resize", onResize);
    };
  }, [open]);
  if (!mounted) return null;
  const live = isOpenNow();
  const latest = LB_DATA.posts[0];
  return ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    className: "lb-mm" + (show ? " show" : ""),
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "Menu"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lb-mm-scrim",
    onClick: close
  }), /*#__PURE__*/React.createElement("div", {
    className: "lb-mm-sheet"
  }, /*#__PURE__*/React.createElement("nav", {
    className: "lb-mm-nav"
  }, NAV.map(([k, l, sub], i) => /*#__PURE__*/React.createElement("a", {
    key: k,
    onClick: () => nav(k),
    className: "lb-mm-link" + (page === k ? " on" : ""),
    style: {
      "--i": i
    },
    "aria-current": page === k ? "page" : undefined
  }, /*#__PURE__*/React.createElement("span", {
    className: "lb-mm-l"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lb-mm-title"
  }, l), /*#__PURE__*/React.createElement("span", {
    className: "lb-mm-sub"
  }, page === k ? "Bạn đang ở đây" : sub)), /*#__PURE__*/React.createElement("span", {
    className: "lb-mm-go"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 20
  }))))), /*#__PURE__*/React.createElement("a", {
    className: "lb-mm-post",
    style: {
      "--i": 4
    },
    onClick: () => nav("post", latest.id)
  }, /*#__PURE__*/React.createElement("span", {
    className: "lb-label",
    style: {
      color: "var(--fg-1)"
    }
  }, "B\xE0i m\u1EDBi \xB7 ", latest.date), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      fontSize: 15,
      lineHeight: 1.35
    }
  }, latest.title)), /*#__PURE__*/React.createElement("div", {
    className: "lb-mm-foot",
    style: {
      "--i": 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "lb-mm-status"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lb-mm-dot" + (live ? " live" : "")
  }), live ? "Đang nhận máy" : "Đã đóng cửa", " \xB7 ", LB_DATA.hours), /*#__PURE__*/React.createElement("div", {
    className: "lb-mm-actions"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "lg",
    iconLeft: "phone",
    href: "tel:" + LB_DATA.phone.replace(/\s/g, ""),
    full: true
  }, "G\u1ECDi ", LB_DATA.phone), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    iconRight: "arrow-right",
    onClick: () => nav("book"),
    full: true
  }, "\u0110\u1EB7t l\u1ECBch s\u1EEDa")), /*#__PURE__*/React.createElement("a", {
    className: "lb-mm-addr",
    href: "https://maps.google.com/?q=" + encodeURIComponent(LB_DATA.address),
    target: "_blank",
    rel: "noopener"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 16
  }), /*#__PURE__*/React.createElement("span", null, LB_DATA.address), /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-up-right",
    size: 14
  }))))), document.body);
}
function Header({
  page,
  go
}) {
  const [open, setOpen] = React.useState(false);
  const nav = (k, id) => {
    setOpen(false);
    go(k, id);
  };
  React.useEffect(() => {
    document.documentElement.classList.toggle("lb-menu-open", open);
  }, [open]);
  return /*#__PURE__*/React.createElement("header", {
    className: "lb-header" + (open ? " menu-open" : ""),
    style: {
      position: "sticky"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "lb-container lb-header-in"
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => nav("home"),
    style: {
      cursor: "pointer",
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 24
  })), /*#__PURE__*/React.createElement("nav", {
    className: "lb-nav"
  }, NAV.map(([k, l]) => /*#__PURE__*/React.createElement("a", {
    key: k,
    onClick: () => nav(k),
    className: "lb-navlink" + (page === k ? " on" : "")
  }, l))), /*#__PURE__*/React.createElement("div", {
    className: "lb-header-cta"
  }, /*#__PURE__*/React.createElement(ThemeToggle, null), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    iconLeft: "phone",
    href: "tel:" + LB_DATA.phone
  }, LB_DATA.phone), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    onClick: () => nav("book")
  }, "\u0110\u1EB7t l\u1ECBch s\u1EEDa")), /*#__PURE__*/React.createElement("div", {
    className: "lb-burger"
  }, /*#__PURE__*/React.createElement(ThemeToggle, null), /*#__PURE__*/React.createElement("span", {
    className: "lb-quickcall"
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "phone",
    label: "Gọi " + LB_DATA.phone,
    variant: "primary",
    onClick: () => {
      location.href = "tel:" + LB_DATA.phone.replace(/\s/g, "");
    }
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "lb-burger-btn" + (open ? " x" : ""),
    "aria-label": open ? "Đóng menu" : "Mở menu",
    "aria-expanded": open,
    onClick: () => setOpen(!open)
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null)))), /*#__PURE__*/React.createElement(MobileMenu, {
    open: open,
    page: page,
    nav: nav,
    close: () => setOpen(false)
  }));
}
function SectionHead({
  no,
  title,
  aside,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "lb-sechead"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--type-h2)"
    }
  }, title), children && /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--fg-2)",
      marginTop: 12,
      maxWidth: 560
    }
  }, children)), aside && /*#__PURE__*/React.createElement("div", {
    className: "lb-sechead-aside"
  }, aside));
}
const LB_MOCK_IMG = "mockup.png"; // review-only stand-in for missing photos; set to null to show hatched placeholders
function Placeholder({
  label,
  ratio = "16/9",
  style
}) {
  if (LB_MOCK_IMG) return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: ratio,
      borderRadius: "var(--radius-md)",
      overflow: "hidden",
      background: "var(--ink-100)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: LB_MOCK_IMG,
    alt: label || "",
    loading: "lazy",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block"
    }
  }), label && /*#__PURE__*/React.createElement("span", {
    className: "lb-label",
    style: {
      position: "absolute",
      left: 10,
      top: 10,
      background: "rgba(18,18,16,.72)",
      color: "var(--ink-50)",
      padding: "3px 7px",
      borderRadius: 2,
      fontSize: 10
    }
  }, label));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: ratio,
      borderRadius: "var(--radius-md)",
      background: "repeating-linear-gradient(135deg,var(--ink-100) 0 10px,var(--ink-50) 10px 20px)",
      display: "grid",
      placeItems: "center",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "lb-label"
  }, label));
}
function PageHero({
  eyebrow,
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "lb-container",
    style: {
      paddingTop: "clamp(48px,8vw,104px)",
      paddingBottom: "clamp(40px,6vw,72px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "lb-enter"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lb-label",
    style: {
      marginBottom: 20,
      "--d": 0
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--type-h1)",
      lineHeight: 1.04,
      letterSpacing: "-0.03em",
      maxWidth: 900,
      "--d": 1
    }
  }, title), children && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--type-lead)",
      color: "var(--fg-2)",
      marginTop: 20,
      maxWidth: 640,
      "--d": 2
    }
  }, children)));
}
function Footer({
  go
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--band-bg)",
      color: "var(--band-fg)",
      marginTop: "var(--section-y)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "lb-container",
    style: {
      paddingTop: 72,
      paddingBottom: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "lb-footer-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Wordmark, {
    size: 26,
    inverse: true,
    tagline: true
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--band-fg-2)",
      marginTop: 18,
      maxWidth: 340,
      fontSize: 15
    }
  }, "Trung t\xE2m s\u1EEDa ch\u1EEFa thi\u1EBFt b\u1ECB c\xF4ng ngh\u1EC7 v\xE0 m\xE1y t\xEDnh. Th\xE0nh l\u1EADp n\u0103m 2012 v\u1EDBi t\xEAn LAPPY.")), /*#__PURE__*/React.createElement("div", {
    className: "lb-footer-col"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lb-label",
    style: {
      color: "var(--band-fg-2)"
    }
  }, "Trang"), NAV.map(([k, l]) => /*#__PURE__*/React.createElement("a", {
    key: k,
    onClick: () => go(k)
  }, l))), /*#__PURE__*/React.createElement("div", {
    className: "lb-footer-col"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lb-label",
    style: {
      color: "var(--band-fg-2)"
    }
  }, "Li\xEAn h\u1EC7"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "phone",
    size: 16
  }), " ", LB_DATA.phone), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 16
  }), " ", LB_DATA.address), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 16
  }), " ", LB_DATA.hours))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--band-border)",
      marginTop: 56,
      paddingTop: 20,
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 12,
      fontSize: 13,
      color: "var(--band-fg-2)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 C\xF4ng ty TNHH LAPBEE"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)"
    }
  }, "2012 \u2192 2026"))));
}
Object.assign(window, {
  ThemeToggle,
  Header,
  Footer,
  SectionHead,
  Placeholder,
  PageHero
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/data.js
try { (() => {
window.LB_DATA = {
  phone: "1900 0000",
  address: "123 Đường Mẫu, Quận 1, TP. Hồ Chí Minh",
  hours: "08:00 – 20:00, Thứ 2 – Chủ nhật",
  services: [{
    icon: "laptop",
    title: "Sửa laptop",
    desc: "Chẩn đoán lỗi nguồn, mainboard, bản lề, bàn phím cho mọi hãng.",
    time: "Từ 1 giờ"
  }, {
    icon: "apple",
    title: "MacBook & iMac",
    desc: "Thay pin, màn hình Retina, sửa lỗi logic board, vệ sinh tản nhiệt.",
    time: "Từ 2 giờ"
  }, {
    icon: "monitor",
    title: "Thay màn hình",
    desc: "Màn hình chính hãng và tương đương, kiểm tra điểm chết trước khi giao.",
    time: "Từ 45 phút"
  }, {
    icon: "hard-drive",
    title: "Cứu dữ liệu",
    desc: "Khôi phục dữ liệu ổ HDD, SSD, thẻ nhớ trong phòng sạch.",
    time: "Báo sau kiểm tra"
  }, {
    icon: "cpu",
    title: "Nâng cấp & lắp ráp",
    desc: "Nâng RAM, SSD, card đồ hoạ; build PC theo nhu cầu công việc.",
    time: "Trong ngày"
  }, {
    icon: "building-2",
    title: "Dịch vụ doanh nghiệp",
    desc: "Bảo trì định kỳ, hợp đồng IT, xử lý sự cố tại văn phòng.",
    time: "Theo hợp đồng"
  }],
  steps: [["Tiếp nhận", "Mô tả lỗi qua điện thoại hoặc mang máy đến trung tâm."], ["Kiểm tra miễn phí", "Kỹ thuật viên chẩn đoán và báo giá trước khi làm."], ["Sửa chữa", "Chỉ tiến hành khi bạn đồng ý. Theo dõi tiến độ qua mã phiếu."], ["Bàn giao & bảo hành", "Kiểm tra cùng bạn, phiếu bảo hành bằng văn bản."]],
  team: [{
    name: "Nguyễn Minh Khoa",
    role: "Nhà sáng lập · Giám đốc",
    since: 2012
  }, {
    name: "Trần Thu Hà",
    role: "Trưởng phòng kỹ thuật",
    since: 2014
  }, {
    name: "Lê Quốc Bảo",
    role: "Chuyên gia mainboard",
    since: 2015
  }, {
    name: "Phạm Ngọc Anh",
    role: "Chăm sóc khách hàng",
    since: 2017
  }, {
    name: "Võ Đức Thịnh",
    role: "Kỹ thuật viên MacBook",
    since: 2018
  }, {
    name: "Đặng Mỹ Linh",
    role: "Phụ trách doanh nghiệp",
    since: 2020
  }, {
    name: "Huỳnh Gia Huy",
    role: "Cứu dữ liệu",
    since: 2021
  }, {
    name: "Bùi Thanh Tâm",
    role: "Kỹ thuật viên phần cứng",
    since: 2023
  }],
  timeline: [{
    year: "2012",
    photos: [{
      label: "QUẦY SỬA ĐẦU TIÊN · 2012",
      src: "https://images.unsplash.com/photo-1642229408339-572fa3328d10?w=1400&q=70&auto=format&fit=crop"
    }],
    title: "LAPPY ra đời",
    body: "Một quầy sửa laptop nhỏ với hai kỹ thuật viên và một cam kết: báo giá trước, sửa sau."
  }, {
    year: "2015",
    photos: [{
      label: "XƯỞNG MAINBOARD",
      src: "https://images.unsplash.com/photo-1593687395549-400945fed803?w=1400&q=70&auto=format&fit=crop"
    }, {
      label: "MÁY HÀN BGA",
      src: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=1400&q=70&auto=format&fit=crop"
    }],
    title: "Mở xưởng mainboard",
    body: "Đầu tư thiết bị hàn chip BGA, nhận sửa các lỗi mà nơi khác từ chối."
  }, {
    year: "2018",
    photos: [],
    quote: {
      text: "Lần đầu ký hợp đồng với một văn phòng 40 máy, chúng tôi hiểu rằng doanh nghiệp không cần người sửa nhanh nhất, mà cần người đến đúng hẹn mỗi lần.",
      by: "Nguyễn Minh Khoa",
      role: "Nhà sáng lập"
    },
    title: "Phục vụ doanh nghiệp",
    body: "Ký những hợp đồng bảo trì IT đầu tiên cho văn phòng và trường học."
  }, {
    year: "2021",
    photos: [{
      label: "BIỂN HIỆU LAPBEE MỚI",
      src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&q=70&auto=format&fit=crop"
    }, {
      label: "ĐỘI NGŨ 2021",
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=70&auto=format&fit=crop"
    }, {
      label: "QUẦY TIẾP NHẬN MỚI",
      src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1400&q=70&auto=format&fit=crop"
    }],
    title: "Đổi tên thành LAPBEE",
    body: "Thương hiệu mới, cùng đội ngũ và cách làm việc cũ — cẩn thận như một tổ ong."
  }, {
    year: "2024",
    photos: [{
      label: "PHÒNG SẠCH",
      src: "https://images.unsplash.com/photo-1721333084062-71c1f242459a?w=1400&q=70&auto=format&fit=crop"
    }, {
      label: "Ổ CỨNG HƯ HỎNG",
      src: "https://images.unsplash.com/photo-1721333084500-901c456ac225?w=1400&q=70&auto=format&fit=crop"
    }, {
      label: "THIẾT BỊ ĐỌC CHIP",
      src: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=1400&q=70&auto=format&fit=crop"
    }, {
      label: "KỸ THUẬT VIÊN LÀM VIỆC",
      src: "https://images.unsplash.com/photo-1631031509251-62a73758f9d3?w=1400&q=70&auto=format&fit=crop"
    }, {
      label: "KHU LƯU TRỮ",
      src: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=1400&q=70&auto=format&fit=crop"
    }],
    title: "Phòng cứu dữ liệu",
    body: "Phòng sạch chuyên dụng cho ổ cứng và SSD hư hỏng vật lý."
  }, {
    year: "2026",
    photos: [{
      label: "ĐỘI NGŨ HIỆN TẠI · 2026",
      src: "https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=1400&q=70&auto=format&fit=crop"
    }],
    title: "14 năm",
    body: "Tiếp tục mở rộng dịch vụ và chia sẻ kiến thức qua chuyên mục bài đăng."
  }],
  categories: ["Tất cả", "Mẹo hay", "Tin tức", "Hướng dẫn", "Khuyến mãi"],
  posts: [{
    id: 1,
    cat: "Hướng dẫn",
    title: "5 dấu hiệu pin laptop cần được thay",
    excerpt: "Máy sập nguồn khi còn 20%, pin phồng hay sạc không vào — đây là lúc nên kiểm tra.",
    date: "12.11.2026",
    read: "4 phút",
    featured: true
  }, {
    id: 2,
    cat: "Mẹo hay",
    title: "Vệ sinh laptop bao lâu một lần là đủ?",
    excerpt: "Chu kỳ hợp lý tuỳ môi trường sử dụng. Kỹ thuật viên của chúng tôi gợi ý cách tính.",
    date: "05.11.2026",
    read: "3 phút"
  }, {
    id: 3,
    cat: "Tin tức",
    title: "LAPBEE mở thêm khung giờ nhận máy buổi tối",
    excerpt: "Từ tháng 11, trung tâm nhận máy đến 20:00 tất cả các ngày trong tuần.",
    date: "01.11.2026",
    read: "2 phút"
  }, {
    id: 4,
    cat: "Hướng dẫn",
    title: "Sao lưu dữ liệu trước khi mang máy đi sửa",
    excerpt: "Ba cách sao lưu đơn giản để bạn yên tâm trong lúc chờ sửa chữa.",
    date: "24.10.2026",
    read: "5 phút"
  }, {
    id: 5,
    cat: "Khuyến mãi",
    title: "Kiểm tra sức khoẻ máy miễn phí cho doanh nghiệp",
    excerpt: "Áp dụng cho văn phòng từ 10 máy trở lên trong tháng này.",
    date: "18.10.2026",
    read: "2 phút"
  }, {
    id: 6,
    cat: "Mẹo hay",
    title: "SSD hay HDD: nâng cấp nào đáng tiền nhất?",
    excerpt: "So sánh tốc độ, độ bền và chi phí cho máy dùng văn phòng và đồ hoạ.",
    date: "10.10.2026",
    read: "6 phút"
  }, {
    id: 7,
    cat: "Mẹo hay",
    title: "Cách kéo dài tuổi thọ bàn phím laptop",
    excerpt: "Thói quen nhỏ giúp phím không bị liệt hay kẹt sau vài năm.",
    date: "02.10.2026",
    read: "3 phút"
  }, {
    id: 8,
    cat: "Hướng dẫn",
    title: "Nhận biết màn hình bị điểm chết",
    excerpt: "Kiểm tra nhanh trong 2 phút trước khi mua hoặc nhận máy.",
    date: "26.09.2026",
    read: "4 phút"
  }, {
    id: 9,
    cat: "Tin tức",
    title: "LAPBEE ra mắt tra cứu tiến độ bằng mã phiếu",
    excerpt: "Theo dõi tình trạng sửa chữa trực tuyến mọi lúc.",
    date: "18.09.2026",
    read: "2 phút"
  }, {
    id: 10,
    cat: "Hướng dẫn",
    title: "Khi nào nên thay keo tản nhiệt CPU?",
    excerpt: "Dấu hiệu máy nóng bất thường và chu kỳ bảo dưỡng hợp lý.",
    date: "09.09.2026",
    read: "5 phút"
  }, {
    id: 11,
    cat: "Mẹo hay",
    title: "Sạc laptop qua đêm có hại pin không?",
    excerpt: "Giải thích đơn giản về chu kỳ sạc và chế độ bảo vệ pin.",
    date: "30.08.2026",
    read: "4 phút"
  }, {
    id: 12,
    cat: "Khuyến mãi",
    title: "Giảm 20% vệ sinh máy cho sinh viên",
    excerpt: "Áp dụng khi xuất trình thẻ sinh viên đến hết tháng.",
    date: "22.08.2026",
    read: "1 phút"
  }, {
    id: 13,
    cat: "Tin tức",
    title: "Mở rộng xưởng mainboard tầng 2",
    excerpt: "Thêm 4 bàn kỹ thuật và thiết bị hàn mới.",
    date: "12.08.2026",
    read: "3 phút"
  }, {
    id: 14,
    cat: "Hướng dẫn",
    title: "Laptop vào nước: 5 việc cần làm ngay",
    excerpt: "Những thao tác đúng giúp tăng khả năng cứu máy.",
    date: "01.08.2026",
    read: "5 phút"
  }, {
    id: 15,
    cat: "Mẹo hay",
    title: "Chọn RAM nâng cấp đúng chuẩn cho máy",
    excerpt: "Bus, dung lượng và khe cắm: những điều cần kiểm tra.",
    date: "20.07.2026",
    read: "6 phút"
  }, {
    id: 16,
    cat: "Tin tức",
    title: "Hợp tác bảo trì cho 12 trường học",
    excerpt: "Chương trình kiểm tra định kỳ phòng máy học sinh.",
    date: "08.07.2026",
    read: "3 phút"
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/data.js", error: String((e && e.message) || e) }); }

// ui_kits/website/motion.js
try { (() => {
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({
      duration: 1.15,
      easing: t => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2
    });
    const raf = t => {
      lenis.raf(t);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    window.__lenis = lenis;
  }
  window.lbScrollTo = (target, opts = {}) => {
    const el = typeof target === 'string' ? document.querySelector(target) : null;
    const y = el ? el.getBoundingClientRect().top + window.scrollY + (opts.offset || 0) : typeof target === 'number' ? target : 0;
    if (lenis) {
      if (opts.immediate) {
        lenis.stop();
        window.scrollTo(0, y);
        lenis.resize();
        lenis.scrollTo(y, {
          immediate: true,
          force: true
        });
        lenis.start();
      } else lenis.scrollTo(y, {
        duration: 1.1,
        force: true
      });
    } else window.scrollTo({
      top: y,
      behavior: opts.immediate || reduce ? 'auto' : 'smooth'
    });
  };
  const SEL = ['.lb-sechead', '.lb-grid-2>*', '.lb-grid-3>*', '.lb-grid-4>*', '.lb-proc-side', '.lb-proc-card', '.lb-stats>div', '.lb-jr-text>*', '.lb-pr-head>*', '.lb-pr-grid>*', '[data-reveal-clip]', '.lb-biz>*', '.lb-biz-list>li', '.lb-prose>*', '.lb-filter', '.lb-book>*', '.lb-reveal', 'footer .lb-footer-grid>*', 'main article>*'].join(',');
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  }), {
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.08
  });
  const scan = () => document.querySelectorAll(SEL).forEach(el => {
    if (el.dataset.rv || el.closest('.lb-postlist')) return;
    el.dataset.rv = '1';
    const sibs = el.parentElement ? [...el.parentElement.children].filter(c => c.matches(SEL)) : [el];
    el.style.setProperty('--i', Math.min(sibs.indexOf(el), 6));
    if (reduce) {
      el.classList.add('in');
      return;
    }
    io.observe(el);
  });
  new MutationObserver(() => requestAnimationFrame(scan)).observe(document.getElementById('root'), {
    childList: true,
    subtree: true
  });
  let last = -1;
  const onScroll = () => {
    if (document.documentElement.classList.contains('lb-menu-open')) return;
    const y = window.scrollY;
    document.documentElement.classList.toggle('lb-scrolled', y > 12);
    const h = document.querySelector('.lb-header');
    if (h && last >= 0 && y !== last) {
      const hide = y > 240 && y > last && !document.documentElement.classList.contains('lb-menu-open');
      h.classList.toggle('lb-hide', hide);
      document.documentElement.classList.toggle('lb-hdr-hidden', hide);
    }
    if (h) document.querySelector('.lb-progress') && document.querySelector('.lb-progress').style.setProperty('top', document.documentElement.classList.contains('lb-hdr-hidden') ? '0px' : h.offsetHeight - 1 + 'px');
    last = y;
    const p = document.querySelector('.lb-hero-media');
    if (p && !reduce && innerWidth > 820) p.style.transform = 'translateY(' + (y * -0.06).toFixed(1) + 'px)';
    const bar = document.querySelector('.lb-progress');
    if (bar) {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    }
  };
  window.addEventListener('scroll', onScroll, {
    passive: true
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/motion.js", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.LOGO_MARK = __ds_scope.LOGO_MARK;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Pagination = __ds_scope.Pagination;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

})();
