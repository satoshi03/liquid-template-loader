import Path from 'path';

import { getOptions } from 'loader-utils';
import assign from 'object-assign';
import Liquid from 'liquid';


const Engine = new Liquid.Engine();
const DefaultKey = "liquid";

export default async function loader(content) {
  let options = getOptions(this);
  const key = options.config || DefaultKey;
  const config = this.options && this.options.hasOwnProperty(key)
          ? this.options[key] : {};
  delete options.config;
  options = assign(options, config);

  const root = Path.join(options.context || ".");
  Engine.registerFileSystem(new Liquid.LocalFileSystem(root));

  // Add filters
  if (typeof options.filters === 'object') {
    Engine.registerFilters(config.filters);
  }

  // Add tags
  if (typeof options.tags === 'object') {
    for(let key in options.tags) {
      Engine.registerTag(key, options.tags[key]);
    }
  }

  // Render
  return Engine.parseAndRender(content, options.data || {}).then(
    (result) => {
      return (null, result);
    }
  )
};
