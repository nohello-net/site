/**
 * @param {string[]} langs - list of paths (i.e. en,de,fr)
 * @param {string} base - default path, probably the first lang
 * @param {string | null | undefined} preferred - the stated preference, usually saved from a previous session
 * @param {string=} matching - probably via navigator.language
 * @returns {string} i.e. /en, /pt-br
 */
const languageMatcher = (langs, base, preferred, matching) => {
  if (preferred != null && langs.includes(preferred)) {
    return `/${preferred}`;
  }

  // no explicit language, let's try to match against our known langs
  if (matching != null) {
    // we have a string to match, we expect it to look something like:
    // - en
    // - en_US
    // - en-us
    const normalised = matching.toLowerCase().replace(/[-_]/, '-');

    // first, try to match exactly. otherwise, try to match on first component
    if (langs.includes(normalised)) {
      return `/${normalised}`;
    }

    const parts = normalised.split('-');
    const firstPart = parts[0];
    if (firstPart != null && langs.includes(firstPart)) {
      return `/${firstPart}`;
    }
  }

  // nothing from the environment? let's default to base language
  return `/${base}`;
};

// eslint-disable-next-line import/prefer-default-export
export { languageMatcher };
