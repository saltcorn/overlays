# overlays

View overlays

This module enables to you run a view as a static overlay on pages and views in Saltcorn. It supplies an action `` that causes an overlay to appear on the current view.

To use this as a PageLoad action, Saltcorn 1.4.0-beta.5 or later is required. Otherwise use it as an On Page Load action inside specific views or pages.

To use this:

1. Build a view you would like to serve as an overlay on pages and views. Ideally, this should have all of its content on a card or a container with a a set background - otherwise it will appear transparent. Also set the height and the width in the box settings.
2. Create a trigger with When = PageLoad, action = display_view_overlay.
3. In the trigger configuration, select the view. You can enter a show-if formula and a formula for the state of the view.

In scope for the formulas is whatever the payload (row) is for your trigger. For PageLoad, this includes: `type`, which is `"page"` or `"view"`. `name`, the name of the current page. `query`, the view state in object form. But if you run the action with a different *when* trigger, the row is in scope.

The variable `url` is always in scope in the formulas, this is the relative url (e.g. `"/view/myview?id=1"`)
