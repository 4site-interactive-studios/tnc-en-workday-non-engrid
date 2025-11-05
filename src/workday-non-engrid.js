(function() {
  const mappings = [
    {
      old: {
        revenueCategory: "null",
        applicationOther: "Merchandise (460000)",
      },
      new: {
        revenueCategory: "UR:Merchandise Revenue (460000)",
        applicationOther: "Non-gift",
      },
    },
    {
      old: {
        revenueCategory: "null",
        applicationOther: "Lodging (460500)",
      },
      new: {
        revenueCategory: "UR:Hotel And Lodging (460000)",
        applicationOther: "Non-gift",
      },
    },
    {
      old: {
        revenueCategory: "null",
        applicationOther: "Miscellaneous Fee Revenue (460700)",
      },
      new: {
        revenueCategory: "UR:Miscellaneous Fee Revenue (460000)",
        applicationOther: "Non-gift",
      },
    },
    {
      old: {
        revenueCategory: "null",
        applicationOther: "Use Permits & Non-Real Estate Leases (461000)",
      },
      new: {
        revenueCategory:
          "UR:Use Permits and Non-Real Estate Leases Over Time (460000)",
        applicationOther: "Non-gift",
      },
    },
    {
      old: {
        revenueCategory: "null",
        applicationOther: "Trip Fees (462100)",
      },
      new: {
        revenueCategory: "UR:Fee-Field Trip (460000)",
        applicationOther: "Non-gift",
      },
    },
    {
      old: {
        revenueCategory: "null",
        applicationOther: "Special Event Revenue (462400)",
      },
      new: {
        revenueCategory: "UR:Special Event Revenue (460000)",
        applicationOther: "Non-gift",
      },
    },
    {
      old: {
        revenueCategory: "Unrestricted",
        applicationOther: "",
      },
      new: {
        revenueCategory: "UR:Donor Support (400000)",
        applicationOther: "",
      },
    },
    {
      old: {
        revenueCategory: "Temporarily Restricted",
        applicationOther: "",
      },
      new: {
        revenueCategory: "TR:Donor Support (400000)",
        applicationOther: "",
      },
    },
  ];
  let revenueCategoryField;
  let applicationOtherField;

  function shouldRun() {
    return !!(revenueCategoryField && applicationOtherField);
  }

  function getNewValues(oldRevenueCategory, oldApplicationOther) {
    return (
      mappings.find(
        (m) =>
          m.old.revenueCategory.toLowerCase() ===
          oldRevenueCategory.toLowerCase() &&
          m.old.applicationOther.toLowerCase() ===
          oldApplicationOther.toLowerCase()
      )?.new || false
    );
  }

  function setFieldValue(field, value) {
    if (field instanceof HTMLSelectElement) {
      let option = [...field.options].find((opt) => opt.value === value);

      if (!option) {
        option = new Option(value, value);
        field.add(option);
      }

      field.value = value;
      return;
    }

    field.value = value;
  }

  function setNewFieldValues() {
    if (!revenueCategoryField || !applicationOtherField) {
      return;
    }

    log(
      `Looking for new mapping for Revenue Category: "${revenueCategoryField.value}", Application Other: "${applicationOtherField.value}"`
    );

    const newValues = getNewValues(revenueCategoryField.value, applicationOtherField.value);

    if (!newValues) {
      log(`No updated mapping found. Not updating fields.`);
      return;
    }

    log(
      `Mapping to new values - Revenue Category: "${newValues.revenueCategory}", Application Other: "${newValues.applicationOther}"`
    );

    setFieldValue(revenueCategoryField, newValues.revenueCategory);
    setFieldValue(applicationOtherField, newValues.applicationOther);
  }

  function log(message) {
    const debug = (new URLSearchParams(window.location.search)).get('debug');
    if (debug === null) return;
    console.log(`[Workday Field Mapping]: ${message}`);
  }

  function run() {
    revenueCategoryField = document.querySelector(
      '[name="transaction.othamt4"]'
    );
    applicationOtherField = document.querySelector(
      '[name="transaction.othamt1"]'
    );
    if (!shouldRun()) return;
    log("Running Workday field mapping");
    setNewFieldValues();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
}());
