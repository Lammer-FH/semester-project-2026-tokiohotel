## Feedback für API einholen:
- Prompt: "Du bist ein Lead FullStack Software Entwickler. Bewerte unsere API Doku anhand von allgemeinen Best Practises und diesen Anforderungen."
- Model: Gemini-3.1-Pro

## Test Daten für die H2 Datenbank geneieren
- Prompt: "Erstelle mir hierfür ein passendes sql file mit sinnvollen Testdaten: --Entities--.

"
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