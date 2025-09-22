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
const { eval_expression } = require("@saltcorn/data/models/expression");
module.exports = {
  sc_plugin_api_version: 1,

  plugin_name: "overlays",
  //viewtemplates: [require("./edit-nton")],
  actions: {
    display_view_overlay: {
      run: async ({
        row,
        table,
        configuration: {
          show_if,
          state_fml,
          view,
          location,
          height,
          height_units,
          width,
          width_units,
        },
        user,
        req,
      }) => {
        const url = req?.originalUrl;

        if (
          show_if &&
          !eval_expression(
            show_if,
            { url, ...(row || {}) },
            user,
            "display_view_overlay show_if"
          )
        )
          return;

        const state = state_fml
          ? eval_expression(
              state_fml,
              { url, ...(row || {}) },
              user,
              "display_view_overlay state formula"
            )
          : {};
        return {
          eval_js: `activate_global_overlays(${JSON.stringify({
            state,
            view,
            location,
            height,
            height_units,
            width,
            width_units,
          })})`,
        };
      },
      configFields: async () => {
        const views = await View.find({});
        return [
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
            sublabel: "Or set in an outer container in the view",
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
            sublabel: "Or set in an outer container in the view",

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
            sublabel: "Optional. Formula for boolean",
          },
          {
            label: "State object",
            name: "state_fml",
            type: "String",
            class: "validate-expression",
            sublabel: "Optional. Formula for object",
          },
        ];
      },
    },
  },
  headers: [
    {
      script: `/plugins/public/overlays@${
        require("./package.json").version
      }/overlays.js`,
    },

    /* {
      css: `/plugins/public/overlays@${
        require("./package.json").version
      }/selectize.bootstrap5.css`,
    },*/
  ],
};
