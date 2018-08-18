const STORIES_OF = "storiesOf";

function pushParts(source, parts, from, to) {
  const start = source.slice(from, to);
  parts.push(start);

  const end = source.slice(to);
  parts.push(end);
}

function handleSTORYOF(node, parts, source, lastIndex) {
  if (!node.callee || !node.callee.name || node.callee.name !== STORIES_OF) {
    return lastIndex;
  }

  parts.pop();
  pushParts(source, parts, lastIndex, node.end);
  return node.end;
}

export { handleSTORYOF };
