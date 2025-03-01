import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { api } from "@/services/api";

function createSlug(title: string) {
  return title
    .toLowerCase()
    .trim() // Removes leading and trailing spaces
    .replace(/\s+/g, "-") // Replaces multiple spaces with a single dash
    .replace(/[^a-z0-9-]+/g, ""); // Removes non-alphanumeric characters except dashes
}

const CreateBlogPage = () => {
  const [inPreviewMode, setInPreviewMode] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const handlesubmitblog = async (status: string) => {
    const slug = createSlug(title);

    try {
      await api.createBlog(title, content, status, slug);
      alert("Blog created successfully");
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Failed to create blog");
    }
  };

  const writingmode = () => {
    return (
      <div className="w-full mt-5 text-xl ">
        <form action="submit " className="flex flex-col gap-2">
          <label htmlFor="title">Title:</label>
          <Input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="title"
            required
          ></Input>
          <label htmlFor="content">Content:</label>
          <MDEditor
            value={content}
            onChange={(value) => setContent(value || "")}
            hideToolbar={true} // Hide the toolbar
            preview="edit" // Show only the writing area
            className="border-[1px] border-black-0.5 !bg-white !shadow-none text-black "
          />
        </form>

        <div className="w-full flex justify-center gap-5 mt-5">
          <Button onSubmit={() => handlesubmitblog("Draft")}>Save Draft</Button>
          <Button onSubmit={() => handlesubmitblog("Published")} className="">
            Publish
          </Button>
        </div>
      </div>
    );
  };

  const previewmode = () => {
    console.log(content);
    return (
      <article className="container mx-auto mt-5  rounded-b-[40px] flex flex-col  items-center">
        <h1 className="text-3xl font-bold mb-[30px]">{title}</h1>
        <div className="prose prose-lg text-left  w-full max-w-[700px] break-words">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </article>
    );
  };

  return (
    <div className="container  mx-auto p-7 flex flex-col items-center  max-w-[700px] ">
      <div className="w-full text-left flex justify-between items-center">
        <h1 className="sm:text-3xl text-xl font-semibold">Control Buttons:</h1>
        <div className=" flex space-x-2 ">
          <Button onClick={() => setInPreviewMode(false)}>Edit</Button>
          <Button onClick={() => setInPreviewMode(true)}>Preview</Button>
        </div>
      </div>

      {inPreviewMode ? previewmode() : writingmode()}
    </div>
  );
};

export default CreateBlogPage;
