const capitalizeCamelCase = (str: string) => {
  const newStr = str.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });
  return newStr.charAt(0).toUpperCase() + newStr.slice(1);
};

export default capitalizeCamelCase;
