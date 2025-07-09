export function parseToJSON(xmlString: string) {
  const attributes = xmlString.match(/(\w+)='([^']*)'/g);
  const jsonObject: Record<string, string> = {};

  if (attributes) {
    attributes.forEach((attr) => {
      const [key, value] = attr.split('=');
      jsonObject[key] = value.replace(/'/g, '');
    });
  }

  return jsonObject;
}
