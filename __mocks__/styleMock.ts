const styles = new Proxy(
  {},
  { get: (_target, prop) => (typeof prop === "string" ? prop : "") }
);
export default styles;
