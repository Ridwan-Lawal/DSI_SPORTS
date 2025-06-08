import Input from "@/src/app/_components/auth/Input";

const CONTACTS = [
  { department: "CEO / Founder", email: "lawalridwan860@gmail.com" },
  { department: "Tech Team", email: "lawalridwan860@gmail.com" },
];

export default function ContactForm() {
  return (
    <div>
      <form
        action=""
        autoComplete="on"
        className="mx-auto flex max-w-[600px] flex-col gap-6"
      >
        {/*============== Who to contact========= */}
        <div className="flex flex-col gap-2">
          <label htmlFor="emailToContact" className="text-[15px] font-medium">
            Who do you wish to contact*:{" "}
          </label>
          <select
            name="emailToContact"
            id="emailToContact"
            className="rounded-sm border border-neutral-200 px-4 py-2.5 outline-gray-200"
          >
            {CONTACTS?.map((contact, id) => (
              <option key={id} value={contact?.email} className="text-[15px]">
                {contact?.department} ({contact?.email})
              </option>
            ))}
          </select>
        </div>

        {/* =============  summary =================== */}
        <Input htmlFor="summary" label="Summary*" error="">
          <input
            type="text"
            name="summary"
            id="summary"
            defaultValue=""
            autoComplete="summary"
            aria-label="summary"
            aria-live="polite"
          />
        </Input>

        {/* =============  Message =================== */}
        <Input htmlFor="message" label="Message*" error="">
          <textarea
            rows={4}
            name="message"
            id="message"
            defaultValue=""
            autoComplete="message"
            aria-label="message"
            aria-live="polite"
          />
        </Input>

        {/* =============  Your name =================== */}
        <Input htmlFor="name" label="Your Name*" error="">
          <input
            type="text"
            name="name"
            id="name"
            defaultValue=""
            autoComplete="name"
            aria-label="name"
            aria-live="polite"
          />
        </Input>

        {/* =============  Your email =================== */}
        <Input htmlFor="email" label="Your Email*" error="">
          <input
            type="text"
            name="email"
            id="email"
            defaultValue=""
            autoComplete="email"
            aria-label="email"
            aria-live="polite"
          />
        </Input>

        <button className="mt-1 rounded-sm bg-neutral-800 px-6 py-2.5 text-[15px] font-medium text-white">
          Submit
        </button>
      </form>
    </div>
  );
}
