# How to add my API?
### Method #1
1. Create a new YAML file in the [`collection/`](https://github.com/tools-collection/apis-collection/tree/main/collection) directory named `<slug>.yaml`
2. Run `npm run validate` to check your file is valid
3. Run `npm run build` to rebuild README and dist files
4. Make PR with changes

### Method #2
1. Run `npm run add` to run an interactive editor. Provide it with required information
2. Run `npm run build` to rebuild README and dist files
3. Make PR with changes

### Method #3
1. Create an issue with API's description and provide as much information about it as possible

# How can I help?
- add new API
- suggest changes to API's information
- mark API as inactive (move to `graveyard/` directory)
- add link to API specification if missing or invalid
- add/edit library
- categorization improvements (new categories, more accurate names for categories, suggestions to eliminate a category)
- anything else, really...

# Who can add new APIs?
Anyone can add or suggest changes to an API

# What kind of APIs can be added?
Publicly available APIs of any kind (paid or free)

# Should I make changes in README.md directly?
No, it is generated from the template and API data.

- To change `README.md` texts, edit [`templates/README.handlebars`](https://github.com/tools-collection/apis-collection/blob/main/templates/README.handlebars)
- To modify API information, edit the corresponding file in [`collection/`](https://github.com/tools-collection/apis-collection/tree/main/collection)
- To add a new category, edit [`categories.yaml`](https://github.com/tools-collection/apis-collection/blob/main/categories.yaml)

# APIs to add
Search for issues with labels ["help wanted" and "new api"](https://github.com/tools-collection/apis-collection/issues?q=is%3Aissue+is%3Aopen+label%3A"new+api"+label%3A"help+wanted"). These list one or more APIs that should be added.

# Does API definition have a schema?
Yes — the schema is defined in [`src/schema.ts`](https://github.com/tools-collection/apis-collection/blob/main/src/schema.ts) using Zod.

Required fields: `name`, `slug`, `categories` (at least one from `categories.yaml`).

# Available commands
| Command | Description |
|---|---|
| `npm run add` | Interactive wizard to add a new API |
| `npm run build` | Rebuild `README.md` and `dist/` files |
| `npm run validate` | Validate all YAML files against the schema |
| `npm run check-links` | Check all API links are reachable |
| `npm run check-orphans` | Find collection files not referenced anywhere |
| `npm run enrich` | Enrich API data from external sources |
