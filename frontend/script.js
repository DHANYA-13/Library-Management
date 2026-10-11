async function loadDashboard() {
    const response = await fetch(`${API}/dashboard`);
    const data = await response.json();

    // Browser la irukura puthu data va serthu kaatu
    let savedBooks = JSON.parse(localStorage.getItem("myBooks") || "[]");
    let savedMembers = JSON.parse(localStorage.getItem("myMembers") || "[]");
    let myTrans = JSON.parse(localStorage.getItem("myTransactions") || "[]");

    let localTotalBooks = 0;
    let localAvailable = 0;
    savedBooks.forEach(b => {
        localTotalBooks += Number(b.quantity);
        localAvailable += Number(b.available);
    });

    let localIssued = myTrans.filter(t => t.status === "Issued").length;

    document.getElementById("totalBooks").innerText = data.totalBooks + localTotalBooks;
    document.getElementById("availableBooks").innerText = data.availableBooks + localAvailable;
    document.getElementById("issuedBooks").innerText = data.issuedBooks + localIssued;
    document.getElementById("totalMembers").innerText = data.totalMembers + savedMembers.length;
    document.getElementById("totalFine").innerText = data.totalFine;
}
