(params) => {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < params.length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

/*
 * For sample code and reference material, visit
 * https://docs.transposit.com/references/js-operations
 */
