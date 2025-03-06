import { supabase } from "@/lib/supabaseClient";

type MemoryObject = {
  date: string;
  title: string;
  description: string;
  image: string | null;
};

async function getAllMemories() {
  try {
    const { data, error } = await supabase
      .from("user_memories")
      .select()
      .order("date", { ascending: false });

    if (error) {
      console.error("Error fetching memories:", error);
      return [];
    }

    console.log("memories", data);
    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    return [];
  }
}

async function postMemory(memory: MemoryObject) {
  try {
    const { data, error } = await supabase.from("user_memories").insert({
      date: memory.date,
      title: memory.title,
      description: memory.description,
      image_metadata: memory.image,
    });
    if (error) {
      console.log("Error inserting memory", error);
      return;
    }
    console.log("Inserted memory: ", data);
  } catch (err) {
    console.log("Unexpected error:", err);
  }
}

export { getAllMemories, postMemory };
