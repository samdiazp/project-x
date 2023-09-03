import { headers } from "next/headers";
async function getData() {
  const host = headers().get("host");
  const res = await fetch(`http://${host}/api/registers`);
  return await res.json();
}
async function Registers() {
  const registers: string[] = await getData();
  return (
    <div className="mt-4 p-2 w-full">
      <table className="w-full">
        <thead>
          <tr>
            <th>Token</th>
            <th>Decoded</th>
          </tr>
        </thead>
        <tbody>
          {registers.map((key) => {
            const token = key.split(":")[0];
            const decoded = key.split(":")[1];
            return (
              <tr key={key}>
                <td>{token}</td>
                <td>{decoded}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Registers;
