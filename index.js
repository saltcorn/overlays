const {
  option,
  a,
  h5,
  span,
  text_attr,
  script,
  input,
  style,
  domReady,
} = require("@saltcorn/markup/tags");
const tags = require("@saltcorn/markup/tags");
const { select_options } = require("@saltcorn/markup/helpers");
const { features, getState } = require("@saltcorn/data/db/state");
const Workflow = require("@saltcorn/data/models/workflow");
const Table = require("@saltcorn/data/models/table");
const View = require("@saltcorn/data/models/view");
const Form = require("@saltcorn/data/models/form");
const FieldRepeat = require("@saltcorn/data/models/fieldrepeat");

const configuration_workflow = () =>
  new Workflow({
    steps: [
      {
        name: "overlays",
        form: async () => {
          const views = await View.find({});
          return new Form({
            blurb: "Select the global overlays",
            fields: [
              new FieldRepeat({
                name: "overlays",
                fields: [
                  {
                    name: "view",
                    label: "View",
                    type: "String",
                    required: true,
                    attributes: {
                      options: views.map((v) => v.name),
                    },
                  },
                  {
                    name: "location",
                    label: "Location",
                    type: "String",
                    required: true,
                    attributes: {
                      options: ["Bottom right"],
                    },
                  },
                  {
                    name: "height",
                    label: "Height",
                    type: "Integer",
                    sublabel:
                      "Optional. Alternatively, set height in an outer container in the view",
                    attributes: {
                      asideNext: true,
                    },
                  },
                  {
                    name: "height_units",
                    label: "Height units",
                    type: "String",
                    required: true,
                    attributes: {
                      options: ["px", "%", "vw", "em", "rem", "cm"],
                    },
                  },
                   {
                    name: "width",
                    label: "Width",
                    type: "Integer",
                    sublabel:
                      "Optional. Alternatively, set width in an outer container in the view",
                    attributes: {
                      asideNext: true,
                    },
                  },
                  {
                    name: "width_units",
                    label: "Width units",
                    type: "String",
                    required: true,
                    attributes: {
                      options: ["px", "%", "vw", "em", "rem", "cm"],
                    },
                  },
                  {
                    label: "Show if",
                    name: "show_if",
                    type: "String",
                    class: "validate-expression",
                    sublabel:
                      "Optional. Formula for boolean. In scope: <code>user</code> and <code>url</code>",
                  },
                  {
                    label: "State object",
                    name: "state",
                    type: "String",
                    class: "validate-expression",
                    sublabel:
                      "Optional. Formula for object. In scope: <code>user</code> and <code>url</code>",
                  },
                ],
              }),
            ],
          });
        },
      },
    ],
  });

module.exports = {
  sc_plugin_api_version: 1,
  configuration_workflow,
  plugin_name: "overlays",
  //viewtemplates: [require("./edit-nton")],
  headers: ({ overlays }) => [
    {
      script: `/plugins/public/overlays@${
        require("./package.json").version
      }/overlays.js`,
    },
    {
      scriptBody: "console.log('hello from overlays')",
    },
    /* {
      css: `/plugins/public/overlays@${
        require("./package.json").version
      }/selectize.bootstrap5.css`,
    },*/
  ],
};
