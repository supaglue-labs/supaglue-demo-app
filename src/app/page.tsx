import { Content } from "@/components/Content";
import { Nav } from "@/components/Nav";

export default function Dashboard() {
  return (
    <>
      <Nav title="Dashboard" />
      <Content>
        <div className="flex flex-col items-center">
          <div className="text-xl">
            Hello Tom, welcome to{" "}
            <span className="text-primary">Apolla.io</span>
          </div>
          <div>
            Follow these simple steps to get started and earn Free Credits worth
            $50.
          </div>

          {/* Onboarding Accordion */}
          <div className="my-6 flex flex-col gap-6 items-center">
            <div className="join join-vertical bg-base-300">
              <div className="collapse collapse-close join-item border border-base-300">
                <input type="radio" name="my-accordion-4" />
                <div className="collapse-title text-md font-medium flex flex-col items-center justify-center gap-6">
                  <div className="text-neutral text-xl font-medium">
                    Your quick setup guide
                  </div>
                  <progress
                    className="progress progress-accent w-56"
                    value="70"
                    max="100"
                  ></progress>
                </div>
                <div className="collapse-content">
                  <p>hello</p>
                </div>
              </div>

              <div className="collapse collapse-close collapse-arrow join-item border border-base-300">
                <input type="radio" name="my-accordion-4" />
                <div className="collapse-title text-md font-medium">
                  1. Find your first lead
                </div>
                <div className="collapse-content">
                  <p>hello</p>
                </div>
              </div>
              <div className="collapse collapse-close collapse-arrow join-item border border-base-300">
                <input type="radio" name="my-accordion-4" />
                <div className="collapse-title text-md font-medium">
                  2. Engage with your leads
                </div>
                <div className="collapse-content">
                  <p>hello</p>
                </div>
              </div>
              <div className="collapse collapse-close collapse-arrow join-item border border-base-300">
                <input type="radio" name="my-accordion-4" />
                <div className="collapse-title text-md font-medium">
                  3. Create your first sequence
                </div>
                <div className="collapse-content">
                  <p>hello</p>
                </div>
              </div>
              <div className="collapse collapse-close collapse-arrow join-item border border-base-300">
                <input type="radio" name="my-accordion-4" />
                <div className="collapse-title text-md font-medium">
                  4. Link your mailbox
                </div>
                <div className="collapse-content">
                  <p>hello</p>
                </div>
              </div>
              <div className="collapse collapse-close collapse-arrow join-item border border-base-300">
                <input type="radio" name="my-accordion-4" />
                <div className="collapse-title text-md font-medium">
                  5. Add leads to sequence
                </div>
                <div className="collapse-content">
                  <p>hello</p>
                </div>
              </div>
              <div className="collapse collapse-close collapse-arrow join-item border border-base-300">
                <input type="radio" name="my-accordion-4" />
                <div className="collapse-title text-md font-medium">
                  6. Activate sequence
                </div>
                <div className="collapse-content">
                  <p>hello</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </>
  );
}
