import InvalidUuidError from "../../../errors/invalid-uuid.error";
import UniqueEntityId from "../unique-entity-id.vo";
import { validate as uuidValidate } from "uuid";

describe("UniqueEntityId Unit Test", () => {
  const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");

  it("should throw error when uuid is invalid", () => {
    expect(() => new UniqueEntityId("fake id")).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept an uuid passed in constructor", () => {
    const uuid = "72f358e4-094a-4a5b-9860-486c55857e57";
    const vo = new UniqueEntityId(uuid);
    expect(vo.value).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should generate an uuid in constructor", () => {
    const vo = new UniqueEntityId();
    expect(uuidValidate(vo.value)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});
