## Feedback für API einholen:
- Prompt: "Du bist ein Lead FullStack Software Entwickler. Bewerte unsere API Doku anhand von allgemeinen Best Practises und diesen Anforderungen."
- Model: Gemini-3.1-Pro

## Generate mock data for API endpoints:
- Prompt: "You know the yml, write the needed endpoints and return the needed mockData"
- Model: Claude Sonnet 4.6 (Claude Code)
- Accepted: Mock data for all room endpoints (`roomMocks.ts`) including 5 rooms with different room types, extras, and a paginated response wrapper.
- Modified: None
- Rejected: None
