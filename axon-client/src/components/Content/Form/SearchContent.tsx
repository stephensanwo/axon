import { Input } from "../../Common/Input";
import { formOptions, useForm } from "@tanstack/react-form";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useContentStore } from "src/context/content/hooks/useContentStore";
import { useEffect } from "react";

function SearchContent() {
  const { setContentTableFilter } = useContentStore();
  const formOpts = formOptions<{
    text: string;
  }>({
    defaultValues: {
      text: "",
    },
  });

  const Form = useForm({
    ...formOpts,
  });

  const text = Form.useStore((state) => state.values.text);

  useEffect(() => {
    setContentTableFilter(Form.state.values.text);
  }, [text]);

  return (
    <Form.Field name="text">
      {({ state, handleChange, handleBlur }) => {
        return (
          <Input.Text
            label=""
            placeholder="Filter Content"
            value={state.value || ""}
            error={""}
            onChange={handleChange}
            onBlur={handleBlur}
            leadingVisual={<MagnifyingGlassIcon />}
            required={false}
            requiredIndicator={false}
            htmlFor="filter-content"
          />
        );
      }}
    </Form.Field>
  );
}

export default SearchContent;
