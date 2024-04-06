import React from "react";

export const SectionBlog = (props) => {
  const { title, text } = props;
  return (
    <section className="w-full">
      <h2 className="text-gray-800 text-xl text-center mt-20">{title}</h2>
      <p className="text-gray-600 mt-10 text-wrap mb-10">{text}</p>
    </section>
  );
};
