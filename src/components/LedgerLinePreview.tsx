export default function LedgerLinePreview() {
  const bars = [45, 72, 58, 90, 65, 80, 50, 85, 60, 75, 55, 95]
  const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']

  return (
    <div className="ll-preview">
      <div className="ll-sidebar">
        <div className="ll-nav-item active">Dashboard</div>
        <div className="ll-nav-item">Transactions</div>
        <div className="ll-nav-item">Chart of Accounts</div>
        <div className="ll-nav-item">Reports</div>
        <div className="ll-nav-item">Audit Trail</div>
        <div className="ll-nav-item">Settings</div>
      </div>
      <div className="ll-main">
        <div className="ll-stats">
          <div className="ll-stat">
            <span className="ll-stat-label">Revenue</span>
            <span className="ll-stat-val">$124,500</span>
          </div>
          <div className="ll-stat">
            <span className="ll-stat-label">Expenses</span>
            <span className="ll-stat-val">$48,200</span>
          </div>
          <div className="ll-stat">
            <span className="ll-stat-label">Net Profit</span>
            <span className="ll-stat-val">$76,300</span>
          </div>
        </div>
        <div className="ll-chart-area">
          <div className="ll-chart-title">Revenue Overview</div>
          <div className="ll-bars">
            {bars.map((h, i) => (
              <div className="ll-bar-wrap" key={i}>
                <div className="ll-bar" style={{ height: `${h}%` }} />
                <span className="ll-bar-label">{months[i]}</span>
              </div>
            ))}
          </div>
        </div>
        <table className="ll-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2026-08-01</td>
              <td>Stripe Payout</td>
              <td>Revenue</td>
              <td>$12,400</td>
              <td><span className="ll-status income">Income</span></td>
            </tr>
            <tr>
              <td>2026-08-03</td>
              <td>AWS Infrastructure</td>
              <td>Hosting</td>
              <td>$1,200</td>
              <td><span className="ll-status expense">Expense</span></td>
            </tr>
            <tr>
              <td>2026-08-05</td>
              <td>Client Invoice #1042</td>
              <td>Services</td>
              <td>$8,500</td>
              <td><span className="ll-status income">Income</span></td>
            </tr>
            <tr>
              <td>2026-08-07</td>
              <td>Office Rent</td>
              <td>Operations</td>
              <td>$3,400</td>
              <td><span className="ll-status expense">Expense</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
