import "setimmediate";
import cloudinary from "cloudinary";

import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({
  cloud_name: "dwsphnrdl",
  api_key: "428638739912938",
  api_secret: "DYrjsy4oMib9xS2TPB51e2vB22Q",
  secure: true,
});

describe("test fileUpload", () => {
  test("should load file and return image url", async () => {
    const imgRes = await fetch("https://source.unsplash.com/random/400x400");
    const blob = await imgRes.blob();

    const file = new File([blob], "file.png");
    const url = await fileUpload(file);

    expect(typeof url).toBe("string");

    const segments = url.split("/");
    const imgId = segments[segments.length - 1].replace(".jpg", "");
    console.log(imgId);

    await cloudinary.v2.api.delete_resources(imgId);
  });

  test("should return an error", async () => {
    const file = new File([], "file.png");
    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
