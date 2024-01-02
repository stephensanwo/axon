export interface ISupportedLanguage {
  ext: string;
  language: string;
}

export const SUPPORTED_LANGUAGES: ISupportedLanguage[] = [
  { ext: "ts", language: "typescript" },
  { ext: "js", language: "javascript" },
  { ext: "html", language: "html" },
  { ext: "css", language: "css" },
  { ext: "go", language: "go" },
  { ext: "py", language: "python" },
  { ext: "java", language: "java" },
  { ext: "md", language: "markdown" },
  { ext: "txt", language: "plaintext" },
  { ext: "abap", language: "abap" },
  { ext: "apex", language: "apex" },
  { ext: "azcli", language: "azcli" },
  { ext: "bat", language: "bat" },
  { ext: "bicep", language: "bicep" },
  { ext: "clg", language: "cameligo" },
  { ext: "clj", language: "clojure" },
  { ext: "coffee", language: "coffee" },
  { ext: "c", language: "cpp" },
  { ext: "cpp", language: "cpp" },
  { ext: "cs", language: "csharp" },
  { ext: "csp", language: "csp" },
  { ext: "cypher", language: "cypher" },
  { ext: "dart", language: "dart" },
  { ext: "dockerfile", language: "dockerfile" },
  { ext: "ecl", language: "ecl" },
  { ext: "ex", language: "elixir" },
  { ext: "f9", language: "flow9" },
  { ext: "fs", language: "fsharp" },
  { ext: "ftl", language: "freemarker2" },
  { ext: "go", language: "go" },
  { ext: "gql", language: "graphql" },
  { ext: "hbs", language: "handlebars" },
  { ext: "hcl", language: "hcl" },
  { ext: "ini", language: "ini" },
  { ext: "julia", language: "julia" },
  { ext: "kt", language: "kotlin" },
  { ext: "less", language: "less" },
  { ext: "lx", language: "lexon" },
  { ext: "lua", language: "lua" },
  { ext: "liquid", language: "liquid" },
  { ext: "m3", language: "m3" },
  { ext: "mdx", language: "mdx" },
  { ext: "mips", language: "mips" },
  { ext: "msdax", language: "msdax" },
  { ext: "sql", language: "mysql" },
  { ext: "m", language: "objective-c" },
  { ext: "p", language: "pascal" },
  { ext: "plg", language: "pascaligo" },
  { ext: "pl", language: "perl" },
  { ext: "sql", language: "pgsql" },
  { ext: "php", language: "php" },
  { ext: "pla", language: "pla" },
  { ext: "ats", language: "postiats" },
  { ext: "pq", language: "powerquery" },
  { ext: "ps1", language: "powershell" },
  { ext: "proto", language: "protobuf" },
  { ext: "pug", language: "pug" },
  { ext: "py", language: "python" },
  { ext: "q", language: "qsharp" },
  { ext: "r", language: "r" },
  { ext: "cshtml", language: "razor" },
  { ext: "redis", language: "redis" },
  { ext: "sql", language: "redshift" },
  { ext: "rst", language: "restructuredtext" },
  { ext: "rb", language: "ruby" },
  { ext: "rs", language: "rust" },
  { ext: "sb", language: "sb" },
  { ext: "scala", language: "scala" },
  { ext: "scm", language: "scheme" },
  { ext: "scss", language: "scss" },
  { ext: "sh", language: "shell" },
  { ext: "sol", language: "solidity" },
  { ext: "aes", language: "sophia" },
  { ext: "rq", language: "sparql" },
  { ext: "sql", language: "sql" },
  { ext: "st", language: "st" },
  { ext: "swift", language: "swift" },
  { ext: "sv", language: "systemverilog" },
  { ext: "tcl", language: "tcl" },
  { ext: "twig", language: "twig" },
  { ext: "vb", language: "vb" },
  { ext: "wgsl", language: "wgsl" },
  { ext: "xml", language: "xml" },
  { ext: "yaml", language: "yaml" },
];

export function getLanguageByExtension(extension: string): string | undefined {
  const languageObject = SUPPORTED_LANGUAGES.find(
    (lang) => lang.ext === extension
  );
  return languageObject ? languageObject.language : undefined;
}