function splitCamelCaseToString(s: string): string {
  return s
    .split(/(?=[A-Z])/)
    .map((p) => {
      return p[0].toUpperCase() + p.slice(1);
    })
    .join(" ");
}

export default splitCamelCaseToString;
