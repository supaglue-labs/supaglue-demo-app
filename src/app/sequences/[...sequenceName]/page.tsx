import { Content } from "@/components/Content";
import { Nav } from "@/components/Nav";

function SequenceAccordion() {
  return (
    <div>
      {/* Stats */}

      <div className="grid grid-cols-10 text-sm rounded p-4 bg-base-200 my-6">
        <div>-</div>
        <div>1</div>
        <div>-</div>
        <div>-</div>
        <div>-</div>
        <div>-</div>
        <div>-</div>
        <div>-</div>
        <div>-</div>
        <div>-</div>

        <div>Active</div>
        <div>Paused</div>
        <div>Finished</div>
        <div>Bounced</div>
        <div>Not sent</div>
        <div>Scheduled</div>
        <div>Delivered</div>
        <div>Reply</div>
        <div>Interested</div>
        <div>Opt out</div>
      </div>

      {/* Menu Bar */}
      <div className="flex gap-4 my-4">
        <button className="btn btn-primary btn-outline btn-sm">
          Add Contacts
        </button>
        <button className="btn btn-neutral btn-outline btn-sm">Resume</button>
      </div>

      <div className="join join-vertical w-full">
        {/* Day 1 */}
        <div className="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-xl font-medium flex items-center gap-4">
            <input
              type="checkbox"
              className="toggle toggle-accent"
              checked
              readOnly
            />
            Day 1: Automatic Email
          </div>
          <div className="collapse-content">
            <div className="grid grid-cols-7 text-sm my-6">
              <div>-</div>
              <div>-</div>
              <div>-</div>
              <div>-</div>
              <div>-</div>
              <div>-</div>
              <div>-</div>

              <div>Scheduled</div>
              <div>Delivered</div>
              <div>Bounced</div>
              <div>Spam Blocked</div>
              <div>Reply</div>
              <div>Interested</div>
              <div>Opt out</div>
            </div>

            <p className="text-sm color-base-200 m-4 italic">
              {" "}
              Hey &#123;first_name&#125;, I was doing some research about
              &#123;company&#125; because I think you fall within the exact
              profile of customers that we can drive high value for. I noticed
              that you haven’t spoken with our customer success team since
              &#60;insert month and year when they last connected with customer
              success &#62;. We have seen some pretty big leaps in our product
              and offerings to customers since then: &#60;summarize recent main
              achievements/progress of your company &#62;. &#60;insert your
              company name &#62; offers: &#60;State core value proposition 1
              &#62; &#60;State core value proposition 2 &#62; &#60;State core
              value proposition 3 &#62; I’d love to learn about what goals
              you’re chasing in the rest of &#123;now_year&#125; and discuss how
              &#123;company&#125; can get you there. What day and time works for
              you? Best, &#123;sender_first_name&#125;
            </p>
          </div>
        </div>

        {/* Day 4 */}
        <div className="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-xl font-medium flex items-center gap-4">
            <input
              type="checkbox"
              className="toggle toggle-accent"
              checked
              readOnly
            />
            Day 4: Automatic Email
          </div>
          <div className="collapse-content">
            <div className="grid grid-cols-7 text-sm my-6">
              <div>-</div>
              <div>-</div>
              <div>-</div>
              <div>-</div>
              <div>-</div>
              <div>-</div>
              <div>-</div>

              <div>Scheduled</div>
              <div>Delivered</div>
              <div>Bounced</div>
              <div>Spam Blocked</div>
              <div>Reply</div>
              <div>Interested</div>
              <div>Opt out</div>
            </div>

            <p className="text-sm color-base-300 m-4 italic">
              &#123;first_name&#125;, let’s set up &#123;company&#125; for
              success. Many of our customers periodically review their use of
              &#60;insert your company name&#62; to ensure it’s set up to
              support their current and future needs. I wanted to check if that
              might be the case at &#123;company&#125; and perhaps now might be
              a good time to review. &#60;insert your company name&#62;’s
              product has seen a few exciting leaps following &#60;briefly
              restate your recent achievements&#62;. Let me know if you’re down
              for a chat. Best, &#123;sender_first_name&#125;
            </p>
          </div>
        </div>

        {/* Day 7 */}
        <div className="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-xl font-medium flex items-center gap-4">
            <input
              type="checkbox"
              className="toggle toggle-accent"
              checked
              readOnly
            />
            Day 7: Automatic Email
          </div>
          <div className="collapse-content">
            <div className="grid grid-cols-7 text-sm my-6">
              <div>-</div>
              <div>-</div>
              <div>-</div>
              <div>-</div>
              <div>-</div>
              <div>-</div>
              <div>-</div>

              <div>Scheduled</div>
              <div>Delivered</div>
              <div>Bounced</div>
              <div>Spam Blocked</div>
              <div>Reply</div>
              <div>Interested</div>
              <div>Opt out</div>
            </div>

            <p className="text-sm color-base-300 m-4 italic">
              Hi &#123;first_name&#125;, Are you still interested in getting
              more out of &#60;insert your company name&#62;? Let&apos;s discuss
              how to accelerate towards your &#123;now_year&#125; goals! Feel
              free to find a time that works for you here: &#60;add link to your
              calendar scheduler&#62; Best, &#123;sender_first_name&#125;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Sequence() {
  return (
    <>
      <Nav title="Sequence" />
      <Content>
        <SequenceAccordion />
      </Content>
    </>
  );
}
