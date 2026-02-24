let currentTab = 'All';
let jobs = [...jobData]; 

function displayJobs() {
    const jobsList = document.getElementById('jobs-list');
    const tabCountDisplay = document.getElementById('tab-job-count');
    
    let filteredJobs = jobs;
    if (currentTab === 'Interview') {
        filteredJobs = jobs.filter(job => job.status === 'INTERVIEW');
    } else if (currentTab === 'Rejected') {
        filteredJobs = jobs.filter(job => job.status === 'REJECTED');
    }

    tabCountDisplay.innerText = `${filteredJobs.length} of ${jobs.length} jobs`;

    jobsList.innerHTML = '';
    if (filteredJobs.length === 0) {
        jobsList.innerHTML = `
            <div class="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                <img src="jobs.png" class="mx-auto mb-4 w-24 opacity-40" alt="Empty">
                <h3 class="text-2xl font-bold text-gray-800">No jobs available</h3>
                <p class="text-gray-500">Check back soon for new job opportunities.</p>
            </div>
        `;
        updateCounts();
        return;
    }

    filteredJobs.forEach(job => {
        const card = document.createElement('div');
        card.className = "bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative group";
        
        card.innerHTML = `
            <div class=" flex justify-between">
                <div>
                    <h3 class="text-xl font-bold text-blue-900">${job.companyName}</h3>
                    <p class="text-gray-500 mb-2">${job.position}</p>
                </div>
                <button onclick="removeJob(${job.id})" class="text-gray-300 hover:text-red-500 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
            
            <div class="flex flex-wrap gap-3 text-sm text-gray-400 mb-4">
                <span>${job.location}</span> • <span>${job.type}</span> • <span>${job.salary}</span>
            </div>

            <div class="mb-4">
                <span class="px-3 py-1 text-xs font-bold rounded bg-blue-50 text-blue-600 border border-blue-100 uppercase">${job.status}</span>
            </div>

            <p class="text-gray-600 text-sm mb-6 leading-relaxed">${job.description}</p>
            
            <div class="flex gap-4">
                <button onclick="changeStatus(${job.id}, 'INTERVIEW')" class="border border-green-500 text-green-600 px-6 py-2 rounded-lg font-bold hover:bg-green-50 text-sm uppercase transition">Interview</button>
                <button onclick="changeStatus(${job.id}, 'REJECTED')" class="border border-red-500 text-red-600 px-6 py-2 rounded-lg font-bold hover:bg-red-50 text-sm uppercase transition">Rejected</button>
            </div>
        `;
        jobsList.appendChild(card);
    });

    updateCounts();
}
function updateCounts() {
    document.getElementById('total-count').innerText = jobs.length;
    document.getElementById('interview-count').innerText = jobs.filter(j => j.status === 'INTERVIEW').length;
    document.getElementById('rejected-count').innerText = jobs.filter(j => j.status === 'REJECTED').length;
}
function switchTab(tab) {
    currentTab = tab;
    

    ['All', 'Interview', 'Rejected'].forEach(t => {
        const btn = document.getElementById(`btn-${t}`);
        if (t === tab) {
            btn.className = "bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold";
        } else {
            btn.className = "bg-gray-200 text-gray-700 px-5 py-2 rounded-lg font-semibold";
        }
    });

    displayJobs();
}