import { Content } from "@/components/Content";
import { Nav } from "@/components/Nav";

function PeopleTable() {
  return (
    <div className="overflow-x-auto">
      {/* Menu Bar */}
      <div className="flex gap-4 my-4">
        <button className="btn btn-primary btn-outline btn-sm">
          Add to Sequence
        </button>
        <button className="btn btn-primary btn-outline btn-sm">Email</button>
        <button className="btn btn-primary btn-outline btn-sm">Export</button>
      </div>

      <table className="table table-xs">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>title</th>
            <th>location</th>
            <th>Email</th>
            <th>Synced to CRM</th>
            <th>Quick Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>Avi Green</td>
            <td>CFO</td>
            <td>United Oil & Gas Corp.</td>
            <td>agreen@uog.com</td>
            <td>x</td>
            <td>
              <button className="btn btn-secondary btn-outline btn-xs btn-disabled">
                Add
              </button>
              <button className="btn btn-secondary btn-outline btn-xs">
                Call
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>Siddartha Nedaerk</td>
            <td>-</td>
            <td>San Francisco, CA</td>
            <td>sid@nedaerk.com</td>
            <td></td>
            <td>
              <button className="btn btn-secondary btn-outline btn-xs">
                Add
              </button>
              <button className="btn btn-secondary btn-outline btn-xs">
                Call
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>Brice Swyre</td>
            <td>SVP, Procurement</td>
            <td>New York, NY</td>
            <td>rose@edge.com</td>
            <td></td>
            <td>
              <button className="btn btn-secondary btn-outline btn-xs">
                Add
              </button>
              <button className="btn btn-secondary btn-outline btn-xs">
                Call
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>Marjy Ferencz</td>
            <td>CFO</td>
            <td>Austin, TX</td>
            <td>sean@edge.com</td>
            <td></td>
            <td>
              <button className="btn btn-secondary btn-outline btn-xs">
                Add
              </button>
              <button className="btn btn-secondary btn-outline btn-xs">
                Call
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>Yancy Tear</td>
            <td>VP, Facilities</td>
            <td>Portland, Oregon</td>
            <td>jrogers@burlington.com</td>
            <td></td>
            <td>
              <button className="btn btn-secondary btn-outline btn-xs">
                Add
              </button>
              <button className="btn btn-secondary btn-outline btn-xs">
                Call
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>Irma Vasilik</td>
            <td>Editor</td>
            <td>New York, NY</td>
            <td>barr@grandhotels.com</td>
            <td></td>
            <td>
              <button className="btn btn-secondary btn-outline btn-xs">
                Add
              </button>
              <button className="btn btn-secondary btn-outline btn-xs">
                Call
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>Meghann Durtnal</td>
            <td>Staff Accountant IV</td>
            <td>Tucson, AZ</td>
            <td>ajames@uog.com</td>
            <td></td>
            <td>
              <button className="btn btn-secondary btn-outline btn-xs">
                Add
              </button>
              <button className="btn btn-secondary btn-outline btn-xs">
                Call
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>Sammy Seston</td>
            <td>Accountant I</td>
            <td>Mountain View, CA</td>
            <td>trypley@uog.com</td>
            <td></td>
            <td>
              <button className="btn btn-secondary btn-outline btn-xs">
                Add
              </button>
              <button className="btn btn-secondary btn-outline btn-xs">
                Call
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>Lesya Tinham</td>
            <td>Safety Technician IV</td>
            <td>Singapore, Singapore</td>
            <td>ibolye@uog.com</td>
            <td></td>
            <td>
              <button className="btn btn-secondary btn-outline btn-xs">
                Add
              </button>
              <button className="btn btn-secondary btn-outline btn-xs">
                Call
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>Zaneta Tewkesbury</td>
            <td>VP Marketing</td>
            <td>Chicago, IL</td>
            <td>jrogers@burlington.com</td>
            <td></td>
            <td>
              <button className="btn btn-secondary btn-outline btn-xs">
                Add
              </button>
              <button className="btn btn-secondary btn-outline btn-xs">
                Call
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>Andy Tipple</td>
            <td>Librarian</td>
            <td>Gateshead, Tyne and Wear NE26, UK</td>
            <td>asong@uog.com</td>
            <td></td>
            <td>
              <button className="btn btn-secondary btn-outline btn-xs">
                Add
              </button>
              <button className="btn btn-secondary btn-outline btn-xs">
                Call
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>Sophi Biles</td>
            <td>Recruiting Manager</td>
            <td>Chicago, IL</td>
            <td>spavlova@uog.com</td>
            <td></td>
            <td>
              <button className="btn btn-secondary btn-outline btn-xs">
                Add
              </button>
              <button className="btn btn-secondary btn-outline btn-xs">
                Call
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>Florida Garces</td>
            <td>Web Developer IV</td>
            <td>Chicago, IL</td>
            <td>bond_john@grandhotels.com</td>
            <td></td>
            <td>
              <button className="btn btn-secondary btn-outline btn-xs">
                Add
              </button>
              <button className="btn btn-secondary btn-outline btn-xs">
                Call
              </button>
            </td>
          </tr>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <td>Maribeth Popping</td>
            <td>Analyst Programmer</td>
            <td>Mountain View, CA</td>
            <td>pat@pyramid.net</td>
            <td></td>
            <td>
              <button className="btn btn-secondary btn-outline btn-xs">
                Add
              </button>
              <button className="btn btn-secondary btn-outline btn-xs">
                Call
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>Moritz Dryburgh</td>
            <td>Dental Hygienist</td>
            <td>Singapore, Singapore</td>
            <td>efrank@genepoint.com</td>
            <td></td>
            <td>
              <button className="btn btn-secondary btn-outline btn-xs">
                Add
              </button>
              <button className="btn btn-secondary btn-outline btn-xs">
                Call
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>Reid Semiras</td>
            <td>Teacher</td>
            <td>Chicago, IL</td>
            <td>asong@uog.com</td>
            <td></td>
            <td>
              <button className="btn btn-secondary btn-outline btn-xs">
                Add
              </button>
              <button className="btn btn-secondary btn-outline btn-xs">
                Call
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>Alec Lethby</td>
            <td>Teacher</td>
            <td>Chicago, IL</td>
            <td>lbolye@uog.com</td>
            <td></td>
            <td>
              <button className="btn btn-secondary btn-outline btn-xs">
                Add
              </button>
              <button className="btn btn-secondary btn-outline btn-xs">
                Call
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>Aland Wilber</td>
            <td>Quality Control Specialist</td>
            <td>New York, NY</td>
            <td>bond_john@grandhotels.com</td>
            <td></td>
            <td>
              <button className="btn btn-secondary btn-outline btn-xs">
                Add
              </button>
              <button className="btn btn-secondary btn-outline btn-xs">
                Call
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>Teddie Duerden</td>
            <td>Staff Accountant III</td>
            <td>New York, NY</td>
            <td>barr_tim@grandhotels.com</td>
            <td></td>
            <td>
              <button className="btn btn-secondary btn-outline btn-xs">
                Add
              </button>
              <button className="btn btn-secondary btn-outline btn-xs">
                Call
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>Lorelei Blackstone</td>
            <td>Data Coordiator</td>
            <td>-</td>
            <td>b.levy@expressl&t.net</td>
            <td></td>
            <td>
              <button className="btn btn-secondary btn-outline btn-xs">
                Add
              </button>
              <button className="btn btn-secondary btn-outline btn-xs">
                Call
              </button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>title</th>
            <th>location</th>
            <th>Email</th>
            <th>Synced to CRM</th>
          </tr>
        </tfoot>
      </table>
      {/* Pagination */}
      <div className="w-full flex justify-end my-4">
        <div className="join grid grid-cols-2">
          <button className="join-item btn btn-sm btn-outline">
            Previous page
          </button>
          <button className="join-item btn btn-sm btn-outline">Next</button>
        </div>
      </div>
    </div>
  );
}

export default function People() {
  return (
    <>
      <Nav title="People" />
      <Content>
        <PeopleTable />
      </Content>
    </>
  );
}
