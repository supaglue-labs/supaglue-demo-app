import { Content } from "@/components/Content";
import { Nav } from "@/components/Nav";

function CompanyTable() {
  return (
    <div className="overflow-x-auto">
      {/* Menu Bar */}
      <div className="flex gap-4 my-4">
        <button className="btn btn-primary btn-outline btn-sm">+ Save</button>
        <button className="btn btn-primary btn-outline btn-sm">
          Find People
        </button>
        <button className="btn btn-primary btn-outline btn-sm">Export</button>
      </div>

      <table className="table table-xs">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Industry</th>
            <th>Website</th>
            <th>Num of employees</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>Gordian Knot Technologies, Inc.</td>
            <td>COMPUTER_SOFTWARE</td>
            <td>gkti.com</td>
            <td>-</td>
            <td>+1 403-253-9409</td>
          </tr>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>MEGA International</td>
            <td>COMPUTER_SOFTWARE</td>
            <td>meta.com</td>
            <td>1000</td>
            <td>-</td>
          </tr>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>PDOA</td>
            <td>HOSPITAL_HEALTH_CARE</td>
            <td>pdoa.com</td>
            <td>50</td>
            <td>8436626233</td>
          </tr>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>Nmgi</td>
            <td>COMPUTER_SOFTWARE</td>
            <td>NMGI.COM</td>
            <td>50</td>
            <td>+1 620-664-6000</td>
          </tr>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>United Oil & Gas, UK</td>
            <td>Energy</td>
            <td>http://www.uos.com</td>
            <td>24000</td>
            <td>+44 191 4956203</td>
          </tr>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>United Oil & Gas, Singapore</td>
            <td>Energy</td>
            <td>http://www.uos.com</td>
            <td>3000</td>
            <td>(650) 450-8810</td>
          </tr>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>Meghann Durtnal</td>
            <td>Staff Accountant IV</td>
            <td>iticket.net</td>
            <td>1000</td>
            <td>(503)421-7800</td>
          </tr>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>Sammy Seston</td>
            <td>Accountant I</td>
            <td>expresslt.net</td>
            <td>20</td>
            <td>(650)450-8810</td>
          </tr>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>Lesya Tinham</td>
            <td>Safety Technician IV</td>
            <td>grandhotels.com</td>
            <td>500</td>
            <td>(512) 757-6000</td>
          </tr>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>Zaneta Tewkesbury</td>
            <td>VP Marketing</td>
            <td>Sauer LLC</td>
            <td>10000</td>
            <td>(014) 427-4427</td>
          </tr>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>Andy Tipple</td>
            <td>Librarian</td>
            <td>pyramid.net</td>
            <td>25000</td>
            <td>+44 191 4956203</td>
          </tr>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>Sophi Biles</td>
            <td>Recruiting Manager</td>
            <td>butlington.com</td>
            <td>10</td>
            <td>(650)450-8810</td>
          </tr>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>Florida Garces</td>
            <td>Web Developer IV</td>
            <td>genepoint.com</td>
            <td>100</td>
            <td>(212) 596-1000</td>
          </tr>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>Maribeth Popping</td>
            <td>Analyst Programmer</td>
            <td>grandcentral.ai</td>
            <td>250</td>
            <td>(212) 842-5500</td>
          </tr>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>Moritz Dryburgh</td>
            <td>Dental Hygienist</td>
            <td>techno.tech</td>
            <td>300</td>
            <td>(503) 521-7800</td>
          </tr>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>Reid Semiras</td>
            <td>Teacher</td>
            <td>dickenson.com</td>
            <td>1000</td>
            <td>(212) 842-5500</td>
          </tr>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>Alec Lethby</td>
            <td>Teacher</td>
            <td>uog.com</td>
            <td>1000</td>
            <td>(785)241-6200</td>
          </tr>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>Aland Wilber</td>
            <td>Quality Control Specialist</td>
            <td>uog.com</td>
            <td>30000</td>
            <td>(503) 421-7800</td>
          </tr>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>Teddie Duerden</td>
            <td>Staff Accountant III</td>
            <td>tribal.ai</td>
            <td>1000</td>
            <td>+44 191 4955203</td>
          </tr>
          <tr>
            <td>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td>Lorelei Blackstone</td>
            <td>Data Coordiator</td>
            <td>aler.tech</td>
            <td>1000</td>
            <td>(650) 451-5500</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>Company</th>
            <th>Location</th>
            <th>Last Login</th>
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

export default function Companies() {
  return (
    <>
      <Nav title="Companies" />
      <Content>
        <CompanyTable />
      </Content>
    </>
  );
}
