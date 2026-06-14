## Get feedback for the API:
- Prompt: "Du bist ein Lead FullStack Software Entwickler. Bewerte unsere API Doku anhand von allgemeinen Best Practises und diesen Anforderungen."
- Model: Gemini-3.1-Pro
- Accepted: Applied some of the AI suggestions but not all because some were not relevant to our specific use case.

## Generate test data for the h2 database:
- Prompt: "Erstelle mir hierfür ein passendes sql file mit sinnvollen Testdaten: --Entities--.
- Model: Gemini-3.1-Pro
- Accepted: SQL file with mock data matched our use case. 

## Generate Favicon: 
- Prompt: "Generiere ein minimalistisches Hotel Icon für ein luxiuriöses Hotel in Wien, das als Favicon verwendet werden kann."
- Model: Gemini Nano Banana
- Modified: "Remove Background"

## Generate Hotel images:
- Prompt: "Generiere ein hochkant Bild von einer Hotel Lobby in Wien"
- Model: Gemini Nano Banana
- Modified: "Passe den Hotel Namen zu "Tokio Hotel" an."

## Generate mock data for API endpoints:
- Prompt: "You know the yml, write the needed endpoints and return the needed mockData"
- Model: Claude Sonnet 4.6 (Claude Code)
- Accepted: Mock data for all room endpoints (`roomMocks.ts`) including 5 rooms with different room types, extras, and a paginated response wrapper.
- Modified: None
- Rejected: None

## Understanding the OpenAPI schema structure:
- Prompt: "Explain the relationship between Room, RoomType and Extra in my OpenAPI yml - how do they nest and why?"
- Model: Claude Sonnet 4.6 (claude.ai)
- Accepted: Clear explanation of the nested object structure and why RoomType is separated from Room (one type, many rooms)
- Modified: None
- Rejected: None

## Learning Pinia store structure:
- Prompt: "Show me how a Pinia store for rooms should look like based on my API response shape - explain each part"
- Model: Claude Sonnet 4.6 (claude.ai)
- Accepted: Store skeleton with state, getters and actions explained line by line
- Modified: Renamed some variables to match our existing naming convention
- Rejected: None

## Understanding Ionic modal pattern:
- Prompt: "Whats the difference between ion-modal and ion-popover for a datepicker use case in Ionic Vue 3?"
- Model: Claude Sonnet 4.6 (claude.ai)
- Accepted: Explanation of both approaches and why ion-modal is better for a full calendar UI
- Modified: None
- Rejected: None

## CSS range highlighting logic:
- Prompt: "Explain how to determine if a date falls between two dates in JavaScript and how i can use that to apply a CSS class dynamically in Vue 3"
- Model: Claude Sonnet 4.6 (claude.ai)
- Accepted: Explanation of Date comparison logic and v-bind:class conditional pattern
- Modified: Adapted the comparison to also handle edge cases like same-day selection
- Rejected: None

## Understanding pagination in REST APIs:
- Prompt: "My API returns totalPages, currentPage and pageSize - how does pagination typically work on the frontend and what do i need to store?"
- Model: Claude Sonnet 4.6 (claude.ai)
- Accepted: Explanation of offset-based pagination and which values to keep in store vs local component state
- Modified: None
- Rejected: None

## Vue 3 computed vs watch for date validation:
- Prompt: "Should i use computed or watch to automatically correct the checkout date when it ends up before checkin?"
- Model: Claude Sonnet 4.6 (claude.ai)
- Accepted: Explanation of why watch with immediate:true fits this case better than computed
- Modified: None
- Rejected: None

## Axios interceptor concept:
- Prompt: "What is an Axios interceptor and how can i use one to swap between mock data and a real API without changing my store code?"
- Model: Claude Sonnet 4.6 (claude.ai)
- Accepted: Conceptual explanation and a minimal example showing request interception
- Modified: None
- Rejected: None

## Understanding BookingRequest DTO validation:
- Prompt: "What annotations should i use on a Spring Boot record DTO to validate required fields, valid email format, and non-blank strings?"
- Model: Claude Sonnet 4.6 (claude.ai)
- Accepted: Explanation of @NotNull, @NotBlank, and @Email annotations and how @Valid triggers them in the controller
- Modified: None
- Rejected: None

## Booking overlap check with JPQL:
- Prompt: "How do i write a JPQL query that checks if a room already has a booking that overlaps with a requested date range?"
- Model: Claude Sonnet 4.6 (claude.ai)
- Accepted: Explanation of the overlap condition (startDate < requestedEnd AND endDate > requestedStart) and how to use it in a @Query method
- Modified: Adjusted parameter naming to match our existing repository conventions
- Rejected: None

## Pinia store pattern for booking:
- Prompt: "I already have a roomStore with loading/error state - how should i structure a similar bookingStore that wraps createBooking and handles HTTP error codes differently (400 vs 409 vs 404)?"
- Model: Claude Sonnet 4.6 (claude.ai)
- Accepted: Store skeleton with error mapping per status code and a resetBooking action
- Modified: Adjusted error messages to German to match our existing UI language
- Rejected: None

## Multi-step form pattern in Vue 3:
- Prompt: "What is a clean way to implement a multi-step form in Vue 3 - form input then review then confirmation - without losing the form data when going back?"
- Model: Claude Sonnet 4.6 (claude.ai)
- Accepted: Explanation of using a reactive step variable with v-if sections, keeping refs alive across steps since they are declared at component level
- Modified: Used our existing styling patterns and Ionic components instead of the generic HTML suggested
- Rejected: Suggestion to use a separate route per step - we preferred keeping it in one component for simplicity

## Email confirmation field validation:
- Prompt: "How do i add a confirm-email field in Vue 3 that validates against the original email input in real time?"
- Model: Claude Sonnet 4.6 (claude.ai)
- Accepted: Using a computed property to compare both trimmed+lowercased values
- Modified: None
- Rejected: None

## Google Maps embed for directions:
- Prompt: "How do i embed Google Maps in a Vue 3 component without needing an API key - just a simple iframe for showing a hotel location?"
- Model: Claude Sonnet 4.6 (claude.ai)
- Accepted: Explanation of using the Google Maps embed iframe with a place query, no API key needed for basic embeds
- Modified: Adjusted the coordinates and zoom level to match our hotel location in Vienna
- Rejected: Suggestion to use the full Google Maps JavaScript API - overkill for a static location display

## Print-friendly CSS for booking confirmation:
- Prompt: "How do i make a dark-themed page printable on A4 using @media print - what colors and layout adjustments are needed?"
- Model: Claude Sonnet 4.6 (claude.ai)
- Accepted: Explanation of using @media print to override dark backgrounds to white, hide interactive elements with a no-print class, and adjust font colors for readability on paper
- Modified: Kept some brand colors (gold accents) in the print version for a nicer look
- Rejected: None

## Structuring a multi-section confirmation page:
- Prompt: "Whats a good way to structure a booking confirmation page in sections - room details, booking period, guest data, directions, contact - using semantic HTML?"
- Model: Claude Sonnet 4.6 (claude.ai)
- Accepted: Using article > section pattern with dl/dt/dd for key-value pairs and address element for contact info
- Modified: Adapted the section headings to match our existing uppercase label style
- Rejected: None

## Implement edit mode on booking review step:
- Prompt: Described the user story (review booking details before submission with ability to edit) and asked Claude Code to implement it, including room change with availability checks
- Model: Claude Opus 4.6 (Claude Code)
- Accepted: Edit button on review step that opens inline editing for guest data, dates, and room selection. Reuses existing RoomCard, AvailabilityBadge, DateRangePicker components and roomStore availability logic (fetchAvailableRoomIds, getRoomAvailability, checkAvailability)
- Modified: Fixed three bugs after initial implementation — edit state persisting across bookings, RoomCard navigating to detail page instead of selecting, and "Ausgewählt" badge overlapping card content (moved above card). Extracted BookingEditRoomList, ConfirmationDirections, and ConfirmationFeedback components to reduce page file sizes. Hid map from print view.
- Rejected: None