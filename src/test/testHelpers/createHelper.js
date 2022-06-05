import { getCats } from "../../helpers/getCats";

describe("Pruebas en helper getCats", () => {
  test("debe traer 1 elemento por defecto", async () => {
    const gifs = await getCats("michi");

    expect(gifs.length).toBe(1);
  });

  test("debe traer 10 elementos como parámetro", async () => {
    const gifs = await getCats("michi");
    expect(gifs.length).toBe(10);
  });
});
