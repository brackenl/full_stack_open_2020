import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import NewBlogForm from "./NewBlogForm";

describe("<NewBlogForm />", () => {
  test("calls the event handler on submit", () => {
    const mockFn = jest.fn();
    const mockFn2 = jest.fn();

    const component = render(<NewBlogForm submit={mockFn} toggle={mockFn2} />);

    const button = component.getByText("Submit Blog");
    fireEvent.click(button);

    expect(mockFn.mock.calls).toHaveLength(1);
  });

  test("passes correct values to event handler", () => {
    const mockFn = jest.fn();
    const mockFn2 = jest.fn();

    const component = render(<NewBlogForm submit={mockFn} toggle={mockFn2} />);

    const titleInput = component.container.querySelector(".titleInput");
    fireEvent.change(titleInput, {
      target: {
        value: "A test blog post title",
      },
    });

    const urlInput = component.container.querySelector(".urlInput");
    fireEvent.change(urlInput, {
      target: {
        value: "T. Testerson",
      },
    });

    const button = component.getByText("Submit Blog");
    fireEvent.click(button);

    expect(mockFn.mock.calls).toHaveLength(1);
    expect(mockFn.mock.calls[0][0]).toBe("A test blog post title");
    expect(mockFn.mock.calls[0][1]).toBe("T. Testerson");
  });
});
