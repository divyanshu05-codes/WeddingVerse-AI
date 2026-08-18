const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ======================================================
// GENERATE WEDDING PLAN
// ======================================================

const generateWeddingPlan = async (weddingData) => {
  const prompt = `
You are an expert AI wedding planner.

Create a practical, personalized and easy-to-follow wedding planning roadmap using the following information.

WEDDING INFORMATION:

Bride:
${weddingData.bride?.fullName || "Not provided"}

Groom:
${weddingData.groom?.fullName || "Not provided"}

Wedding Date:
${weddingData.weddingDetails?.weddingDate || "Not provided"}

Wedding Time:
${weddingData.weddingDetails?.weddingTime || "Not provided"}

Venue:
${weddingData.weddingDetails?.venue || "Not provided"}

City:
${weddingData.weddingDetails?.city || "Not provided"}

Address:
${weddingData.weddingDetails?.address || "Not provided"}

Estimated Budget:
₹${Number(
    weddingData.estimatedBudget || 0
  ).toLocaleString()}

Notes:
${weddingData.notes || "No notes provided"}

Create a detailed but easy-to-understand wedding plan.

Include:

1. Wedding Overview
2. Planning Timeline
3. Important Tasks
4. Budget Planning
5. Vendor Booking Recommendations
6. Guest Planning
7. Final Week Checklist
8. Wedding Day Checklist
9. Important Warnings and Suggestions

Use clear headings and bullet points.

Make the recommendations practical and specific to the information provided.

Do not invent specific vendors, prices, addresses, or facts that were not provided.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  });

  return response.text;
};


// ======================================================
// GENERATE AI WEDDING TASKS
// ======================================================

const generateWeddingTasks = async (weddingData) => {
  const prompt = `
You are an expert AI wedding planner.

Generate a list of specific, actionable tasks for planning this wedding.

WEDDING INFORMATION:

Bride:
${weddingData.bride?.fullName || "Not provided"}

Groom:
${weddingData.groom?.fullName || "Not provided"}

Wedding Date:
${weddingData.weddingDetails?.weddingDate || "Not provided"}

Wedding Time:
${weddingData.weddingDetails?.weddingTime || "Not provided"}

Venue:
${weddingData.weddingDetails?.venue || "Not provided"}

City:
${weddingData.weddingDetails?.city || "Not provided"}

Address:
${weddingData.weddingDetails?.address || "Not provided"}

Estimated Budget:
₹${Number(
    weddingData.estimatedBudget || 0
  ).toLocaleString()}

Notes:
${weddingData.notes || "No notes provided"}

IMPORTANT RULES:

1. Return ONLY a valid JSON array.

2. Do NOT return markdown.

3. Do NOT wrap the JSON in \`\`\`json.

4. Each task must contain exactly these fields:

   - title
   - description
   - category
   - priority
   - dueDate

5. category MUST be exactly ONE of these values:

"Venue"
"Decoration"
"Photography"
"Catering"
"Guests"
"Invitation"
"Clothing"
"Makeup"
"Entertainment"
"Transport"
"Budget"
"Other"

6. priority MUST be exactly ONE of:

"High"
"Medium"
"Low"

7. dueDate MUST use YYYY-MM-DD format.

8. All due dates must be realistic and related to the wedding date.

9. Do not generate dates from a previous year when the wedding is in a future year.

10. All tasks must have a due date before or on the wedding date.

11. Generate 10-15 useful wedding planning tasks.

12. Do not invent specific vendors, prices, addresses, or facts that were not provided.

Return JSON in exactly this format:

[
  {
    "title": "Finalize Wedding Venue",
    "description": "Confirm the venue booking and arrangements.",
    "category": "Venue",
    "priority": "High",
    "dueDate": "2026-08-20"
  },
  {
    "title": "Finalize Guest List",
    "description": "Prepare and confirm the final guest list.",
    "category": "Guests",
    "priority": "Medium",
    "dueDate": "2026-08-25"
  }
]
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  });

  let text = response.text.trim();

  text = text.replace(/^```json\s*/i, "");
  text = text.replace(/^```\s*/i, "");
  text = text.replace(/\s*```$/i, "");

  try {
    const tasks = JSON.parse(text);

    if (!Array.isArray(tasks)) {
      throw new Error(
        "Gemini did not return a valid task array."
      );
    }

    return tasks;

  } catch (error) {

    console.error(
      "Failed to parse AI wedding tasks:",
      text
    );

    throw new Error(
      "AI returned an invalid wedding task format."
    );
  }
};


// ======================================================
// AI BUDGET ANALYSIS
// ======================================================

const generateBudgetAnalysis = async (
  weddingData,
  expenses
) => {

  const totalBudget = Number(
    weddingData.estimatedBudget || 0
  );

  const totalSpent = expenses.reduce(
    (sum, expense) =>
      sum + Number(expense.amount || 0),
    0
  );

  const remainingBudget =
    totalBudget - totalSpent;

  const prompt = `
You are an expert AI wedding budget advisor.

Analyze the following wedding budget and actual expenses.

WEDDING INFORMATION:

Bride:
${weddingData.bride?.fullName || "Not provided"}

Groom:
${weddingData.groom?.fullName || "Not provided"}

Wedding Date:
${
  weddingData.weddingDetails?.weddingDate ||
  "Not provided"
}

City:
${
  weddingData.weddingDetails?.city ||
  "Not provided"
}

Estimated Wedding Budget:
₹${totalBudget.toLocaleString()}

Total Spent:
₹${totalSpent.toLocaleString()}

Remaining Budget:
₹${remainingBudget.toLocaleString()}

EXPENSES:

${
  expenses.length > 0
    ? expenses
        .map(
          (expense, index) => `
${index + 1}.
Category: ${expense.category || "Not provided"}
Title: ${expense.title || "Not provided"}
Amount: ₹${Number(
            expense.amount || 0
          ).toLocaleString()}
Payment Status: ${
            expense.paymentStatus || "Pending"
          }
Date: ${
            expense.expenseDate || "Not provided"
          }
Notes: ${expense.notes || "None"}
`
        )
        .join("\n")
    : "No expenses have been recorded yet."
}

Analyze the wedding budget carefully.

Include these sections:

1. Budget Health
2. Spending Summary
3. Category-wise Analysis
4. Overspending Warnings
5. Pending Payment Analysis
6. Remaining Budget Recommendations
7. Cost Saving Suggestions
8. Priority Actions

Important rules:

- Use the actual numbers provided.
- Do not invent expenses.
- Do not invent vendors or prices.
- Do not assume expenses that are not listed.
- Clearly mention when there is insufficient data.
- Give practical wedding-specific recommendations.
- Keep the response easy to understand.
- Use clear headings and bullet points.
- Calculate percentages only when the required numbers are available.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  });

  return response.text;
};


// ======================================================
// AI TIMELINE ANALYSIS
// ======================================================

const generateTimelineAnalysis = async (
  weddingData,
  tasks
) => {

  const weddingDate =
    weddingData?.weddingDetails?.weddingDate;

  const weddingDateText = weddingDate
    ? new Date(weddingDate)
        .toISOString()
        .split("T")[0]
    : "Not provided";

  const taskText =
    tasks && tasks.length > 0
      ? tasks
          .map(
            (task, index) => `
${index + 1}.
Title: ${task.title || "Not provided"}
Description: ${task.description || "Not provided"}
Category: ${task.category || "Other"}
Priority: ${task.priority || "Medium"}
Due Date: ${
              task.dueDate
                ? new Date(task.dueDate)
                    .toISOString()
                    .split("T")[0]
                : "Not provided"
            }
Completed: ${
              task.completed ? "Yes" : "No"
            }
`
          )
          .join("\n")
      : "No wedding tasks have been created yet.";

  const prompt = `
You are an expert wedding timeline advisor.

Analyze the existing wedding planning tasks and wedding date.

Your job is to identify timeline risks, overdue tasks,
upcoming priorities, missing planning areas, and practical
next actions.

Do NOT create fake tasks.

Do NOT invent vendors.

Do NOT invent dates that are not supported by the wedding
date or existing task information.

Do NOT modify the user's tasks.

Only provide advice based on the information supplied.

WEDDING INFORMATION:

Bride:
${weddingData?.bride?.fullName || "Not provided"}

Groom:
${weddingData?.groom?.fullName || "Not provided"}

Wedding Date:
${weddingDateText}

Wedding Time:
${
  weddingData?.weddingDetails?.weddingTime ||
  "Not provided"
}

Venue:
${
  weddingData?.weddingDetails?.venue ||
  "Not provided"
}

City:
${
  weddingData?.weddingDetails?.city ||
  "Not provided"
}

TASKS:

${taskText}

Analyze the timeline carefully.

Include these sections:

1. Timeline Health
2. Completed Tasks Summary
3. Pending Tasks Summary
4. Overdue Tasks
5. Upcoming High-Priority Tasks
6. Timeline Risks
7. Missing Planning Areas
8. Recommended Next Actions
9. Final Week Readiness
10. Overall Timeline Advice

Important rules:

- Use the actual wedding date.
- Use the actual tasks provided.
- Do not invent completed tasks.
- Do not invent pending tasks.
- Do not invent task dates.
- Clearly identify overdue tasks when their due date is before
  the wedding date and they are incomplete.
- Pay special attention to High priority tasks.
- Mention when there are no tasks or insufficient data.
- Keep the advice practical and easy to understand.
- Do not make decisions on behalf of the user.
- Do not automatically change any task.
- Use clear headings and bullet points.
`;

  const response =
    await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

  return response.text;
};


// ======================================================
// AI GUEST ANALYSIS
// ======================================================

const generateGuestAnalysis = async (
  weddingData,
  guests
) => {

  const guestList = Array.isArray(guests)
    ? guests
    : [];

  // ----------------------------------------------------
  // Calculate actual guest statistics
  // ----------------------------------------------------

  const totalGuestRecords =
    guestList.length;

  const totalPeople = guestList.reduce(
    (sum, guest) =>
      sum + Number(
        guest.numberOfGuests || 1
      ),
    0
  );

  const acceptedPeople =
    guestList
      .filter(
        (guest) =>
          guest.rsvpStatus === "Accepted"
      )
      .reduce(
        (sum, guest) =>
          sum +
          Number(
            guest.numberOfGuests || 1
          ),
        0
      );

  const pendingPeople =
    guestList
      .filter(
        (guest) =>
          guest.rsvpStatus === "Pending"
      )
      .reduce(
        (sum, guest) =>
          sum +
          Number(
            guest.numberOfGuests || 1
          ),
        0
      );

  const declinedPeople =
    guestList
      .filter(
        (guest) =>
          guest.rsvpStatus === "Declined"
      )
      .reduce(
        (sum, guest) =>
          sum +
          Number(
            guest.numberOfGuests || 1
          ),
        0
      );

  // ----------------------------------------------------
  // Prepare actual guest information for Gemini
  // ----------------------------------------------------

  const guestText =
    guestList.length > 0
      ? guestList
          .map(
            (guest, index) => `
${index + 1}.
Name: ${guest.fullName || "Not provided"}
Side: ${guest.side || "Not provided"}
RSVP Status: ${
              guest.rsvpStatus || "Pending"
            }
Meal Preference: ${
              guest.mealPreference || "Not provided"
            }
Number of Guests: ${
              Number(guest.numberOfGuests || 1)
            }
Notes: ${guest.notes || "None"}
`
          )
          .join("\n")
      : "No guests have been added yet.";

  const prompt = `
You are an expert AI wedding guest planning assistant.

Analyze ONLY the actual guest and RSVP information provided below.

Do not invent guests.

Do not invent RSVP responses.

Do not invent meal preferences.

Do not invent attendance numbers.

Do not modify guest records.

Your job is to provide useful planning insights based on
the existing guest data.

WEDDING INFORMATION:

Bride:
${weddingData?.bride?.fullName || "Not provided"}

Groom:
${weddingData?.groom?.fullName || "Not provided"}

Wedding Date:
${
  weddingData?.weddingDetails?.weddingDate ||
  "Not provided"
}

City:
${
  weddingData?.weddingDetails?.city ||
  "Not provided"
}

VENUE:
${
  weddingData?.weddingDetails?.venue ||
  "Not provided"
}

ACTUAL GUEST STATISTICS:

Guest Records:
${totalGuestRecords}

Total People:
${totalPeople}

Accepted People:
${acceptedPeople}

Pending People:
${pendingPeople}

Declined People:
${declinedPeople}

GUEST DATA:

${guestText}

Analyze the guest situation carefully.

Include these sections:

1. Guest Overview
2. RSVP Health
3. Expected Attendance
4. Bride Side vs Groom Side
5. Meal Preference Analysis
6. Pending RSVP Follow-ups
7. Declined Guest Summary
8. Guest Planning Risks
9. Recommended Next Actions
10. Overall Guest Planning Advice

IMPORTANT RULES:

- Use the actual guest information provided.
- Use the actual numberOfGuests values.
- Do not treat every guest record as exactly one attendee when
  numberOfGuests provides a different value.
- Clearly distinguish guest records from total people.
- Do not invent missing information.
- If there are no guests, clearly state that there is insufficient
  data for guest analysis.
- If RSVP information is incomplete, clearly mention it.
- Do not make decisions on behalf of the user.
- Do not automatically contact or modify any guest.
- Give practical wedding-planning advice.
- Keep the response easy to understand.
- Use clear headings and bullet points.
`;

  const response =
    await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

  return response.text;
};

// ======================================================
// AI INVITATION GENERATOR
// ======================================================

const generateInvitation = async (
  weddingData,
  options = {}
) => {
  const {
    style = "Elegant",
    language = "English",
    customMessage = "",
  } = options;

  const brideName =
    weddingData?.bride?.fullName ||
    "Bride";

  const groomName =
    weddingData?.groom?.fullName ||
    "Groom";

  const weddingDate =
    weddingData?.weddingDetails?.weddingDate
      ? new Date(
          weddingData.weddingDetails.weddingDate
        ).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "Not provided";

  const weddingTime =
    weddingData?.weddingDetails?.weddingTime ||
    "Not provided";

  const venue =
    weddingData?.weddingDetails?.venue ||
    "Not provided";

  const city =
    weddingData?.weddingDetails?.city ||
    "Not provided";

  const address =
    weddingData?.weddingDetails?.address ||
    "Not provided";

  const prompt = `
You are an expert wedding invitation writer.

Create a beautiful, warm and ready-to-use wedding invitation
based ONLY on the information provided below.

WEDDING INFORMATION:

Bride:
${brideName}

Groom:
${groomName}

Wedding Date:
${weddingDate}

Wedding Time:
${weddingTime}

Venue:
${venue}

City:
${city}

Address:
${address}

Invitation Style:
${style}

Language:
${language}

Optional Custom Message:
${customMessage || "None"}

IMPORTANT RULES:

1. Do not invent any wedding information.

2. Do not invent:
- relatives
- family names
- ceremony names
- dates
- times
- venues
- addresses
- religious details
- contact information
- RSVP information

3. Use only the information supplied.

4. If information is missing, do not create fake information.
Simply omit that detail from the invitation.

5. The invitation should sound natural and human-written.

6. Do not mention that AI generated the invitation.

7. Do not include explanations before or after the invitation.

8. Return ONLY the invitation content.

9. Use the selected language:
${language}

10. Match the requested style:
${style}

Create an invitation suitable for sharing digitally with
friends and family.

The invitation should contain:

- A welcoming opening
- Bride and groom names
- Wedding date
- Wedding time when available
- Venue/location when available
- A warm closing invitation

Optional custom message:
${customMessage || "No custom message provided."}
`;

  const response =
    await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

  return response.text;
};

// ======================================================
// AI VENDOR ASSISTANT
// ======================================================

const generateVendorAnalysis = async (
  weddingData,
  vendors
) => {
  const totalVendors = vendors.length;

  const totalCost = vendors.reduce(
    (sum, vendor) =>
      sum + Number(vendor.totalCost || 0),
    0
  );

  const totalAdvancePaid = vendors.reduce(
    (sum, vendor) =>
      sum + Number(vendor.advancePaid || 0),
    0
  );

  const totalRemaining = Math.max(
    totalCost - totalAdvancePaid,
    0
  );

  const prompt = `
You are an expert wedding vendor management assistant.

Analyze ONLY the vendors that have already been added
to this wedding management system.

Your job is NOT to recommend or search for vendors.

Do NOT suggest specific vendor businesses, companies,
people, websites, phone numbers, or prices that were
not provided.

WEDDING INFORMATION:

Bride:
${weddingData?.bride?.fullName || "Not provided"}

Groom:
${weddingData?.groom?.fullName || "Not provided"}

Wedding Date:
${
  weddingData?.weddingDetails?.weddingDate ||
  "Not provided"
}

Wedding Time:
${
  weddingData?.weddingDetails?.weddingTime ||
  "Not provided"
}

Venue:
${weddingData?.weddingDetails?.venue || "Not provided"}

City:
${weddingData?.weddingDetails?.city || "Not provided"}

Vendor Summary:

Total Vendors:
${totalVendors}

Total Vendor Cost:
₹${totalCost.toLocaleString("en-IN")}

Total Advance Paid:
₹${totalAdvancePaid.toLocaleString("en-IN")}

Estimated Remaining Vendor Payment:
₹${totalRemaining.toLocaleString("en-IN")}

EXISTING VENDORS:

${
  vendors.length > 0
    ? vendors
        .map(
          (vendor, index) => `
${index + 1}.
Vendor Name:
${vendor.vendorName || "Not provided"}

Company:
${vendor.companyName || "Not provided"}

Category:
${vendor.category || "Not provided"}

Phone:
${vendor.phone || "Not provided"}

Email:
${vendor.email || "Not provided"}

Address:
${vendor.address || "Not provided"}

Total Cost:
₹${Number(
            vendor.totalCost || 0
          ).toLocaleString("en-IN")}

Advance Paid:
₹${Number(
            vendor.advancePaid || 0
          ).toLocaleString("en-IN")}

Payment Status:
${vendor.paymentStatus || "Not provided"}

Rating:
${vendor.rating || "Not provided"}

Notes:
${vendor.notes || "None"}
`
        )
        .join("\n")
    : "No vendors have been added yet."
}

Analyze the existing vendor information carefully.

Include these sections:

1. Vendor Overview
2. Payment Status
3. Pending Vendor Payments
4. Vendor Information Gaps
5. Vendor Follow-up Actions
6. Important Questions to Ask Vendors
7. Potential Planning Issues
8. Priority Actions

IMPORTANT RULES:

- Analyze ONLY the vendors provided.
- Do NOT recommend new vendors.
- Do NOT compare these vendors with imaginary vendors.
- Do NOT invent vendor details.
- Do NOT invent prices.
- Do NOT invent contracts.
- Do NOT invent payment deadlines.
- Do NOT assume a vendor is confirmed unless the provided data supports it.
- Do NOT assume a payment deadline unless one is explicitly provided.
- Clearly mention when information is missing.
- Use the actual numbers provided.
- Calculate remaining payment as total cost minus advance paid.
- Keep recommendations practical and related to vendor management.
- If there are no vendors, clearly explain that there is not enough vendor data for a meaningful analysis.
- Use clear headings and bullet points.
- Keep the analysis easy to understand.

The purpose of this assistant is to help the couple
manage their EXISTING vendors more effectively.

Return a practical vendor-management analysis.
`;

  const response =
    await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

  return response.text;
};

// ======================================================
// AI WEDDING CHATBOT
// ======================================================

const generateWeddingChatResponse = async (
  wedding,
  tasks,
  guests,
  vendors,
  expenses,
  chatHistory,
  userMessage
) => {
  const prompt = `
You are an AI wedding planning assistant.

You are helping the couple manage their actual wedding.

IMPORTANT RULES:

- Use the wedding data provided below.
- Use the existing tasks, guests, vendors and expenses.
- Do NOT invent information.
- If information is missing, clearly say that it is not available.
- Do NOT recommend specific businesses or vendors unless the user
  has already provided that vendor in their wedding data.
- Do NOT invent prices, payment deadlines, contracts or schedules.
- Give practical and concise answers.
- If calculations are required, use the actual provided numbers.
- Answer the user's question directly.
- You may use previous conversation messages to understand context.

======================================================
WEDDING INFORMATION
======================================================

Bride:
${wedding?.bride?.fullName || "Not provided"}

Groom:
${wedding?.groom?.fullName || "Not provided"}

Wedding Date:
${
  wedding?.weddingDetails?.weddingDate ||
  "Not provided"
}

Wedding Time:
${
  wedding?.weddingDetails?.weddingTime ||
  "Not provided"
}

Venue:
${wedding?.weddingDetails?.venue || "Not provided"}

City:
${wedding?.weddingDetails?.city || "Not provided"}

Estimated Budget:
₹${Number(
    wedding?.estimatedBudget || 0
  ).toLocaleString("en-IN")}

Wedding Status:
${wedding?.status || "Not provided"}


======================================================
TASKS
======================================================

${
  tasks?.length
    ? tasks
        .map(
          (task, index) => `
${index + 1}. ${task.title || "Untitled Task"}
Description: ${task.description || "None"}
Category: ${task.category || "Other"}
Priority: ${task.priority || "Medium"}
Due Date: ${task.dueDate || "Not provided"}
Completed: ${task.completed ? "Yes" : "No"}
`
        )
        .join("\n")
    : "No tasks available."
}


======================================================
GUESTS
======================================================

${
  guests?.length
    ? guests
        .map(
          (guest, index) => `
${index + 1}. ${guest.fullName || "Unnamed Guest"}
Side: ${guest.side || "Not provided"}
RSVP: ${guest.rsvpStatus || "Pending"}
Meal Preference: ${
            guest.mealPreference || "Not provided"
          }
Number of Guests: ${
            guest.numberOfGuests || 1
          }
`
        )
        .join("\n")
    : "No guests available."
}


======================================================
VENDORS
======================================================

${
  vendors?.length
    ? vendors
        .map(
          (vendor, index) => `
${index + 1}. ${
            vendor.vendorName || "Unnamed Vendor"
          }
Category: ${vendor.category || "Not provided"}
Company: ${
            vendor.companyName || "Not provided"
          }
Total Cost: ₹${Number(
            vendor.totalCost || 0
          ).toLocaleString("en-IN")}
Advance Paid: ₹${Number(
            vendor.advancePaid || 0
          ).toLocaleString("en-IN")}
Payment Status: ${
            vendor.paymentStatus || "Not provided"
          }
`
        )
        .join("\n")
    : "No vendors available."
}


======================================================
EXPENSES
======================================================

${
  expenses?.length
    ? expenses
        .map(
          (expense, index) => `
${index + 1}. ${
            expense.title ||
            expense.description ||
            "Expense"
          }
Category: ${
            expense.category || "Not provided"
          }
Amount: ₹${Number(
            expense.amount || 0
          ).toLocaleString("en-IN")}
Payment Status: ${
            expense.paymentStatus ||
            "Not provided"
          }
`
        )
        .join("\n")
    : "No expenses available."
}


======================================================
PREVIOUS CHAT
======================================================

${
  chatHistory?.length
    ? chatHistory
        .slice(-10)
        .map(
          (chat) => `
${chat.role === "user" ? "User" : "Assistant"}:
${chat.message}
`
        )
        .join("\n")
    : "No previous conversation."
}


======================================================
CURRENT USER QUESTION
======================================================

${userMessage}

======================================================
RESPONSE INSTRUCTIONS
======================================================

Answer the current user question using the wedding
information and planning data above.

Keep the answer easy to read.

Use bullet points when they improve clarity.

If the user asks about a number such as remaining
vendor payments, guest count or expenses, calculate
it from the supplied data.

If the user asks what they should prioritize, use
the actual incomplete tasks, upcoming dates and
available wedding information.

If the requested information is unavailable, say so
instead of guessing.
`;

  const response =
    await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

  return response.text;
};

// ======================================================
// AI WEDDING INSIGHTS
// ======================================================

const generateWeddingInsights = async (
  wedding,
  tasks,
  guests,
  vendors,
  expenses
) => {
  const weddingBudget = Number(
    wedding?.estimatedBudget || 0
  );

  // -----------------------------
  // TASK STATISTICS
  // -----------------------------

  const totalTasks = Array.isArray(tasks)
    ? tasks.length
    : 0;

  const completedTasks = Array.isArray(tasks)
    ? tasks.filter((task) => task.completed).length
    : 0;

  const pendingTasks =
    totalTasks - completedTasks;

  const highPriorityPendingTasks =
    Array.isArray(tasks)
      ? tasks.filter(
          (task) =>
            !task.completed &&
            task.priority === "High"
        ).length
      : 0;

  // -----------------------------
  // GUEST STATISTICS
  // -----------------------------

  const guestList = Array.isArray(guests)
    ? guests
    : [];

  const totalGuestRecords =
    guestList.length;

  const totalPeople = guestList.reduce(
    (sum, guest) =>
      sum +
      Number(guest.numberOfGuests || 1),
    0
  );

  const acceptedPeople =
    guestList
      .filter(
        (guest) =>
          guest.rsvpStatus === "Accepted"
      )
      .reduce(
        (sum, guest) =>
          sum +
          Number(guest.numberOfGuests || 1),
        0
      );

  const pendingRSVPPeople =
    guestList
      .filter(
        (guest) =>
          guest.rsvpStatus === "Pending"
      )
      .reduce(
        (sum, guest) =>
          sum +
          Number(guest.numberOfGuests || 1),
        0
      );

  const declinedPeople =
    guestList
      .filter(
        (guest) =>
          guest.rsvpStatus === "Declined"
      )
      .reduce(
        (sum, guest) =>
          sum +
          Number(guest.numberOfGuests || 1),
        0
      );

  // -----------------------------
  // VENDOR STATISTICS
  // -----------------------------

  const vendorList = Array.isArray(vendors)
    ? vendors
    : [];

  const totalVendors =
    vendorList.length;

  const totalVendorCost =
    vendorList.reduce(
      (sum, vendor) =>
        sum +
        Number(vendor.totalCost || 0),
      0
    );

  const totalAdvancePaid =
    vendorList.reduce(
      (sum, vendor) =>
        sum +
        Number(vendor.advancePaid || 0),
      0
    );

  const remainingVendorPayments =
    Math.max(
      totalVendorCost -
        totalAdvancePaid,
      0
    );

  const pendingVendorPayments =
    vendorList.filter(
      (vendor) =>
        vendor.paymentStatus ===
          "Pending" ||
        vendor.paymentStatus ===
          "Partial"
    ).length;

  // -----------------------------
  // BUDGET STATISTICS
  // -----------------------------

  const expenseList =
    Array.isArray(expenses)
      ? expenses
      : [];

  const totalSpent =
    expenseList.reduce(
      (sum, expense) =>
        sum +
        Number(expense.amount || 0),
      0
    );

  const remainingBudget =
    weddingBudget - totalSpent;

  const budgetUsedPercentage =
    weddingBudget > 0
      ? Number(
          (
            (totalSpent /
              weddingBudget) *
            100
          ).toFixed(1)
        )
      : 0;

  // -----------------------------
  // TASK DATA
  // -----------------------------

  const taskText =
    totalTasks > 0
      ? tasks
          .map(
            (task, index) => `
${index + 1}.
Title: ${task.title || "Not provided"}
Category: ${task.category || "Other"}
Priority: ${task.priority || "Medium"}
Due Date: ${
              task.dueDate
                ? new Date(task.dueDate)
                    .toISOString()
                    .split("T")[0]
                : "Not provided"
            }
Completed: ${
              task.completed
                ? "Yes"
                : "No"
            }
`
          )
          .join("\n")
      : "No tasks available.";

  // -----------------------------
  // GUEST DATA
  // -----------------------------

  const guestText =
    totalGuestRecords > 0
      ? guests
          .map(
            (guest, index) => `
${index + 1}.
Name: ${guest.fullName || "Not provided"}
Side: ${guest.side || "Not provided"}
RSVP: ${guest.rsvpStatus || "Pending"}
Meal: ${guest.mealPreference || "Not provided"}
People: ${Number(
              guest.numberOfGuests || 1
            )}
`
          )
          .join("\n")
      : "No guests available.";

  // -----------------------------
  // VENDOR DATA
  // -----------------------------

  const vendorText =
    totalVendors > 0
      ? vendors
          .map(
            (vendor, index) => `
${index + 1}.
Vendor: ${
              vendor.vendorName ||
              "Not provided"
            }
Category: ${
              vendor.category ||
              "Not provided"
            }
Total Cost: ₹${Number(
              vendor.totalCost || 0
            ).toLocaleString("en-IN")}
Advance Paid: ₹${Number(
              vendor.advancePaid || 0
            ).toLocaleString("en-IN")}
Payment Status: ${
              vendor.paymentStatus ||
              "Not provided"
            }
`
          )
          .join("\n")
      : "No vendors available.";

  // -----------------------------
  // EXPENSE DATA
  // -----------------------------

  const expenseText =
    expenseList.length > 0
      ? expenses
          .map(
            (expense, index) => `
${index + 1}.
Title: ${
              expense.title ||
              expense.description ||
              "Expense"
            }
Category: ${
              expense.category ||
              "Not provided"
            }
Amount: ₹${Number(
              expense.amount || 0
            ).toLocaleString("en-IN")}
Payment Status: ${
              expense.paymentStatus ||
              "Not provided"
            }
`
          )
          .join("\n")
      : "No expenses available.";

  // -----------------------------
  // GEMINI PROMPT
  // -----------------------------

  const prompt = `
You are a senior AI wedding planning strategist.

Analyze the actual wedding planning data below and create an executive-level wedding planning health report.

IMPORTANT RULES:

- Use ONLY the information provided.
- Do NOT invent vendors.
- Do NOT invent expenses.
- Do NOT invent guests.
- Do NOT invent tasks.
- Do NOT invent deadlines.
- Do NOT invent prices.
- Do NOT make assumptions about missing information.
- If data is missing, mention that it is unavailable.
- Base all numerical conclusions on the supplied statistics.
- This is an analysis, not an instruction to modify any records.

==================================================
WEDDING
==================================================

Bride:
${wedding?.bride?.fullName || "Not provided"}

Groom:
${wedding?.groom?.fullName || "Not provided"}

Wedding Date:
${
  wedding?.weddingDetails?.weddingDate
    ? new Date(
        wedding.weddingDetails.weddingDate
      )
        .toISOString()
        .split("T")[0]
    : "Not provided"
}

Wedding Time:
${
  wedding?.weddingDetails?.weddingTime ||
  "Not provided"
}

Venue:
${
  wedding?.weddingDetails?.venue ||
  "Not provided"
}

City:
${
  wedding?.weddingDetails?.city ||
  "Not provided"
}

Wedding Status:
${wedding?.status || "Not provided"}

==================================================
TASK STATISTICS
==================================================

Total Tasks:
${totalTasks}

Completed Tasks:
${completedTasks}

Pending Tasks:
${pendingTasks}

High Priority Pending Tasks:
${highPriorityPendingTasks}

TASKS:

${taskText}

==================================================
GUEST STATISTICS
==================================================

Guest Records:
${totalGuestRecords}

Total Expected People:
${totalPeople}

Accepted People:
${acceptedPeople}

Pending RSVP People:
${pendingRSVPPeople}

Declined People:
${declinedPeople}

GUESTS:

${guestText}

==================================================
VENDOR STATISTICS
==================================================

Total Vendors:
${totalVendors}

Total Vendor Cost:
₹${totalVendorCost.toLocaleString("en-IN")}

Advance Paid:
₹${totalAdvancePaid.toLocaleString("en-IN")}

Remaining Vendor Payments:
₹${remainingVendorPayments.toLocaleString(
    "en-IN"
  )}

Pending/Partial Vendor Payments:
${pendingVendorPayments}

VENDORS:

${vendorText}

==================================================
BUDGET
==================================================

Estimated Wedding Budget:
₹${weddingBudget.toLocaleString(
  "en-IN"
)}

Total Recorded Expenses:
₹${totalSpent.toLocaleString(
  "en-IN"
)}

Remaining Budget:
₹${remainingBudget.toLocaleString(
  "en-IN"
)}

Budget Used:
${budgetUsedPercentage}%

EXPENSES:

${expenseText}

==================================================
RESPONSE FORMAT
==================================================

Return ONLY valid JSON.

Do NOT use markdown.

Do NOT wrap the response in code fences.

Use exactly this structure:

{
  "healthScore": 0,
  "healthStatus": "Excellent",
  "executiveSummary": "",
  "topPriorities": [
    {
      "title": "",
      "description": "",
      "severity": "High"
    }
  ],
  "risks": [
    {
      "area": "Timeline",
      "title": "",
      "description": "",
      "severity": "High"
    }
  ],
  "recommendations": [
    {
      "title": "",
      "description": "",
      "priority": "High"
    }
  ]
}

RULES FOR healthScore:

- Must be a number from 0 to 100.
- Base it on the actual planning data.
- Do not randomly choose a score.

healthStatus MUST be one of:

"Excellent"
"Good"
"Needs Attention"
"Critical"

severity MUST be one of:

"High"
"Medium"
"Low"

priority MUST be one of:

"High"
"Medium"
"Low"

Generate:

- 3 to 5 top priorities
- 2 to 5 meaningful risks
- 3 to 5 actionable recommendations

Keep descriptions concise but useful.

Focus especially on:

1. Incomplete high-priority tasks
2. Timeline readiness
3. Budget pressure
4. Pending guest RSVPs
5. Vendor payment obligations
6. Missing planning information
7. Overall wedding readiness
`;

  const response =
    await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

  let text =
    response.text?.trim() || "";

  // Remove accidental markdown fences
  text = text.replace(
    /^```json\s*/i,
    ""
  );

  text = text.replace(
    /^```\s*/i,
    ""
  );

  text = text.replace(
    /\s*```$/i,
    ""
  );

  try {
    const insights =
      JSON.parse(text);

    if (
      typeof insights !==
        "object" ||
      insights === null
    ) {
      throw new Error(
        "Invalid AI insights object."
      );
    }

    return insights;
  } catch (error) {
    console.error(
      "Failed to parse AI wedding insights:",
      text
    );

    throw new Error(
      "AI returned an invalid wedding insights format."
    );
  }
};

// ======================================================
// EXPORT AI SERVICES
// ======================================================

module.exports = {
  generateWeddingPlan,
  generateWeddingTasks,
  generateBudgetAnalysis,
  generateTimelineAnalysis,
  generateGuestAnalysis,
  generateInvitation,
  generateVendorAnalysis,
  generateWeddingChatResponse,
  generateWeddingInsights,
};