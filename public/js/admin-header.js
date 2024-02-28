const pages = [
    { name: 'Dashboard', url: '/admin' },
    { name: 'Quản lý người dùng', url: '/account-management' },
    { name: 'Quản lý thú cưng', url: '/pet-management' },
    { name: 'Quản lý nhắc nhở', url: '/notification-management' },
    { name: 'Quản lý lịch trình y tế', url: '/schedule-management' },
    { name: 'Báo cáo và phân tích', url: '/reports-and-analytics' },
    { name: 'Cài đặt hệ thống', url: '/system-settings' },
];

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('#searchInput');
    const suggestionsPanel = document.querySelector('.suggestions');

    searchInput.addEventListener('input', function() {
        const input = searchInput.value.toLowerCase();
        suggestionsPanel.innerHTML = ''; // Clear previous suggestions
        if (!input) {
            suggestionsPanel.style.display = 'none';
            return;
        }
        suggestionsPanel.style.display = 'block';

        const filteredSuggestions = pages.filter(page => page.name.toLowerCase().includes(input));
        filteredSuggestions.forEach(page => {
            const div = document.createElement('div');
            div.innerHTML = page.name;
            div.style.cursor = 'pointer';
            div.onclick = function() {
                window.location.href = page.url;
            };
            suggestionsPanel.appendChild(div);
        });

        if (filteredSuggestions.length === 0) {
            suggestionsPanel.innerHTML = '<div>Không tìm thấy kết quả</div>';
        }
    });

    document.querySelector('#btnNavbarSearch').addEventListener('click', function() {
        const input = searchInput.value.toLowerCase();
        const searchPage = pages.find(page => page.name.toLowerCase().includes(input));
        if (searchPage) {
            window.location.href = searchPage.url;
        } else {
            alert('Không tìm thấy trang phù hợp!');
        }
    });
});