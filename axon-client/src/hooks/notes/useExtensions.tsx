import { NodeTypes } from "src/types/node";

export const useExtensions = (): {
  addExtension: (extension: NodeTypes, extensions: Set<NodeTypes>) => void;
  removeExtension: (extension: NodeTypes, extensions: Set<NodeTypes>) => void;
} => {
  const addExtension = (extension: NodeTypes, extensions: Set<NodeTypes>) => {
    // Max 10 extensions
    if (extensions.size <= 10) {
      extensions.add(extension);
    }
  };

  const removeExtension = (
    extension: NodeTypes,
    extensions: Set<NodeTypes>
  ) => {
    extensions.delete(extension);
  };

  return { addExtension, removeExtension };
};
