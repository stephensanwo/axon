import React, { memo, useState } from "react";
import { Handle, Position, ResizeParams } from "@xyflow/react";
import { NodeEntity, NodeTextEntity } from "src/domain/node/node.entity";
import { NodeHandles } from "../NodeHandles";
import { Box } from "@primer/react";
import NodeWrapper from "../NodeWrapper";
import NodeMenu from "./NodeMenu";
import { formOptions, useForm } from "@tanstack/react-form";

export default memo(({ data, connectable, className }: NodeEntity) => {
  const [defaultHeight, setDefaultHeight] = useState(42);
  const nodeContentData = data.content_data as NodeTextEntity;

  const formOpts = formOptions<NodeTextEntity>({
    defaultValues: {
      text: nodeContentData.text ?? "",
    },
  });

  const Form = useForm({
    ...formOpts,
    onSubmit: async ({ value, formApi }) => {
      console.log(value);
    },
  });
  return (
    <>
      <NodeWrapper
        nodeId={data.node_id}
        isVisible={true}
        keepAspectRatio={false}
        // onResizeStart={(e: any, params: ResizeParams) => {
        //   setResizing(() => true);
        //   onResizeStart(id, params);
        // }}
        // onResizeEnd={(e: any, params: ResizeParams) => {
        //   onResizeEnd(id, params);
        //   setResizing(() => false);
        // }}
        shouldResize={() => true}
        onResize={(e: any, params: ResizeParams) => {
          console.log(params);
          setDefaultHeight(params.height);
        }}
      />
      <Form.Field name="text">
        {({ state, handleChange, handleBlur }) => {
          return (
            <textarea
              value={state.value}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={handleBlur}
              style={{
                backgroundColor: "green",
                width: "100%",
                height: `${defaultHeight}px`,
                border: "none",
                outline: "none",
                padding: 8,
                resize: "none",
                scrollbarWidth: "none",
                margin: 0,
              }}
            />
          );
        }}
      </Form.Field>
      <NodeMenu />
      <NodeHandles node_id={data.node_id} />
    </>
  );
});
