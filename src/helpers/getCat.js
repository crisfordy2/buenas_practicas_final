export const getCat = async () => {
  let respuesta = "";
  const url = "https://catfact.ninja/fact?max_length=50";
  await fetch(url)
    .then((response) => response.json())
    .then((data) => (respuesta = data.fact));
  return respuesta;
};
