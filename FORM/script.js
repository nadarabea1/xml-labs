document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('[name="next"]').addEventListener('click', function() {
        document.querySelector('[name="next"]').value = '1';
        document.querySelector('form').submit();
    });

    document.querySelector('[name="previous"]').addEventListener('click', function() {
        document.querySelector('[name="previous"]').value = '1';
        document.querySelector('form').submit();
    });
});
