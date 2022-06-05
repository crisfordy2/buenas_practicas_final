import { shallow } from "enzyme";
import "@testing-library/jest-dom";
import Formulario from "../../components/formulario";

describe("Pruebas en <AgregarCaT/>", () => {
  test("debe cambiar la caja de texto", () => {
    const funcion_prueba = jest.fn();
    const wrapper = shallow(
      <Formulario setCategoriasBusqueda={funcion_prueba} />
    );
    const input = wrapper.find("input");
    const value = "Cat";

    input.simulate("change", { target: { value } });
    expect(wrapper.find("p").text().trim()).toBe("Hi Cats");
  });

  test("NO debe llamar a la función setCat", () => {
    const setCategorias = jest.fn();
    const wrapper = shallow(
      <Formulario setCategoriasBusqueda={setCategorias} />
    );

    wrapper.find("form").simulate("submit", { preventDefault() {} });
    expect(setCategorias).not.toHaveBeenCalled();
  });

  test("debe llamar a la funcion setCat y limpiar la caja de texto", () => {
    const setCategorias = jest.fn();
    const wrapper = shallow(
      <Formulario setCategoriasBusqueda={setCategorias} />
    );
    const value = "simpson";

    wrapper.find("input").simulate("change", { target: { value } });

    wrapper.find("form").simulate("submit", { preventDefault() {} });

    expect(setCategorias).toHaveBeenCalled();
    expect(setCategorias).toHaveBeenCalledTimes(1);
    expect(setCategorias).toHaveBeenCalledWith(expect.any(Function));

    expect(wrapper.find("input").prop("value")).toBe("");
  });
});
