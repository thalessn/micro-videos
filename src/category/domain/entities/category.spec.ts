import { Category, CategoryProperties } from "./category";
import { omit } from "lodash";
import { validate as uuidValidate } from "uuid";
import UniqueEntityId from "../@seedwork/domain/value-objects/unique-entity-id.vo";

describe("Category Unit Tests", () => {
  test("Constructor of category", () => {
    let category = new Category({ name: "Movie" });
    let props = omit(category.props, "created_at");
    expect(props).toStrictEqual({
      name: "Movie",
      description: null,
      is_active: true,
    });
    expect(category.props.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    category = new Category({
      name: "Movie",
      description: "some description",
      is_active: false,
      created_at,
    });
    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "some description",
      is_active: false,
      created_at,
    });

    category = new Category({
      name: "Movie",
      description: "some description 3",
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      description: "some description 3",
    });

    category = new Category({
      name: "Movie",
      is_active: true,
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      is_active: true,
    });

    created_at = new Date();
    category = new Category({
      name: "Movie",
      created_at,
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      created_at,
    });
  });

  test("id field", () => {
    type CategoryData = { props: CategoryProperties; id?: UniqueEntityId };
    const data: CategoryData[] = [
      { props: { name: "Movie" } },
      { props: { name: "Movie" }, id: null },
      { props: { name: "Movie" }, id: undefined },
      { props: { name: "Movie" }, id: new UniqueEntityId() },
    ];

    data.forEach((input) => {
      const category = new Category(input.props, input.id);
      expect(category.id).not.toBeNull();
      expect(category.id).toBeInstanceOf(UniqueEntityId);
    });
  });

  test("getter of name field", () => {
    const category = new Category({ name: "Movie" });
    expect(category.name).toBe("Movie");
  });

  test("getter and setter of description field", () => {
    let category = new Category({
      name: "Movie",
    });
    expect(category.description).toBeNull();

    category = new Category({
      name: "Movie",
      description: "some description",
    });
    expect(category.description).toBe("some description");

    category = new Category({ name: "Movie" });
    category["description"] = "other description";
    expect(category.description).toBe("other description");

    category["description"] = undefined;
    expect(category.description).toBeNull();
  });

  test("getter and setter of is_active props", () => {
    let category = new Category({
      name: "Movie",
    });
    expect(category.props.is_active).toBeTruthy();

    category = new Category({ name: "Movie", is_active: true });
    expect(category.props.is_active).toBeTruthy();

    category = new Category({ name: "Movie", is_active: false });
    expect(category.props.is_active).toBeFalsy();
  });

  test("getter of created_at props", () => {
    let category = new Category({
      name: "Movie",
    });
    expect(category.props.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    category = new Category({
      name: "Movie",
      created_at,
    });
    expect(category.props.created_at).toBe(created_at);
  });
});
