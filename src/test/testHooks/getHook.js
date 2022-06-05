import { useGetCat } from "../../hooks/useGetCat";
import { renderHook } from "@testing-library/react-hooks";

describe("Pruebas del custom hook useGetCat", () => {
  test("Debe retornar el estado inicial del hook", () => {
    const { result } = renderHook(() => useGetCat("simpson"));
    const { gifs, cargando } = result.current;

    expect(gifs).toEqual([]);
    expect(cargando).toBe(true);
  });

  test("Debe retornar loso elementos del valor de la búsqueda", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useGetCat("simpson")
    );
    await waitForNextUpdate();
    const { gifs, cargando } = result.current;

    expect(gifs.length).toBe(5);
    expect(cargando).toBe(false);
  });
});
