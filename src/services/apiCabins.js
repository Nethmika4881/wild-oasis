import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .order("id", { ascending: true });
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  // console.log(data, "Data");
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  // console.log(data, error);
  if (error) {
    console.error("Error deleting task: ", error.message);
    return;
  }
  return data;
}

export async function createCabin(newCabin) {
  const hasImagePath =
    typeof newCabin.image === "string" &&
    newCabin.image?.startsWith("https://");

  // https://wqsxtxaoogwgsvddefmb.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  //create name of the image
  let imagePath = newCabin.image;
  let imageName;
  if (!hasImagePath) {
    imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
    //create url of the image
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);
    if (storageError) throw new Error("Cabin image could not be uploaded");
  }

  //first upload the image to the bucket
  // console.log(newCabin.image);

  // row uploaded to the database
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single();
  if (error) {
    console.error(error);
    if (!hasImagePath && imageName) {
      await supabase.storage.from("cabin-images").remove([imageName]);
    }
    throw new Error("Cabin could not be created");
  }
  //2.uplaod image
  return data;
}

export async function editCabin({ newCabin, id }) {
  console.log(newCabin, "newcabin");
  const hasImagePath =
    typeof newCabin.image === "string" &&
    newCabin?.image?.startsWith("https://");

  let imagePath = newCabin.image;
  let imageName;
  // https://wqsxtxaoogwgsvddefmb.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  //create name of the image
  if (!hasImagePath && newCabin.image) {
    imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    //create url of the image

    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (storageError) throw new Error("Cabin image could not be uploaded");
  }

  // row uploaded to the database
  const { data, error } = await supabase
    .from("cabins")
    .update({ ...newCabin, image: imagePath })
    .eq("id", id)
    .select();
  if (error) {
    console.error(error);
    if (!hasImagePath && imageName) {
      await supabase.storage.from("cabin-images").remove([imageName]);
    }
    throw new Error("Cabin could not be created");
  }
  //2.uplaod image
  return data;
}
