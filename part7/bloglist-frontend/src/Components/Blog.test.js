import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Blog from "./Blog";

describe("<Blog />", () => {
  const blog = {
    author: "Tedrick Thompson",
    id: "5f2850c1a06c2d19f6a50a2f",
    likes: 0,
    title: "Hello",
    url: "asdasd",
  };

  test("displays title and author by default, but not url or likes", () => {
    const component = render(<Blog blog={blog} />);

    const title = component.getByText("Hello");
    const author = component.getByText("by Tedrick Thompson");
    const detailContainer = component.container.querySelector(
      ".detailContainer"
    );

    expect(title).toBeDefined();
    expect(title).toHaveStyle("display: block");
    expect(author).toBeDefined();
    expect(author).toHaveStyle("display: block");
    expect(detailContainer).toBeDefined();
    expect(detailContainer).toHaveStyle("display: none");
  });

  test("displays url or likes when 'view' is clicked", () => {
    const component = render(<Blog blog={blog} />);

    const detailContainer = component.container.querySelector(
      ".detailContainer"
    );

    const view = component.container.querySelector(".detailToggle");
    fireEvent.click(view);

    expect(detailContainer).toHaveStyle("display: block");
  });

  test("like event handler is called once for each click", () => {
    const mockHandler = jest.fn();
    const component = render(<Blog blog={blog} like={mockHandler} />);

    const button = component.getByText("Like");
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
