import { generateSourceWithDecorators } from "./generate-helpers";

function inject(source, decorator) {
  const { changed, source: newSource } = generateSourceWithDecorators(
    source,
    decorator
  );

  if (!changed) {
    return {
      source: newSource,
      changed
    };
  }

  return {
    source: newSource,
    changed
  };
}

export default inject;
