
$(document).ready(function () {
    // Add to wishlist
    $(document).on('click', '.add-to-wishlist', function (e) {
        e.preventDefault();

        var productId = $(this).data('product-id');
        var button = $(this);

        // Disable button to prevent multiple clicks
        button.prop('disabled', true);

        $.ajax({
            url: '/Wishlist/AddItem',
            type: 'POST',
            data: {
                productId: productId,
                __RequestVerificationToken: $('input[name="__RequestVerificationToken"]').val()
            },
            success: function (response) {
                if (response.success) {
                    // Show success message
                    toastr.success(response.message);

                    // Update button appearance
                    button.removeClass('btn-outline-primary').addClass('btn-primary');
                    button.html('<i class="fa fa-heart"></i> Added to Wishlist');

                    // If we're on the wishlist page, add the new item
                    if ($('#wishlist-container').length > 0) {
                        // Remove empty wishlist message if it exists
                        $('#empty-wishlist').remove();

                        // Create new wishlist item HTML
                        var newItem = `
                            <div class="col-md-4 mb-4 wishlist-item" data-item-id="${response.item.id}">
                                <div class="card h-100">
                                    ${response.item.imageUrl ? `<img src="${response.item.imageUrl}" class="card-img-top" alt="${response.item.name}">` : ''}
                                    <div class="card-body">
                                        <h5 class="card-title">${response.item.name}</h5>
                                        <p class="card-text">$${response.item.price.toFixed(2)}</p>
                                        <div class="d-flex justify-content-between">
                                            <a href="/Products/Details/${response.item.productId}" class="btn btn-primary">View Details</a>
                                            <button class="btn btn-danger remove-from-wishlist" data-id="${response.item.id}">
                                                <i class="fa fa-trash"></i> Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;

                        // Append to wishlist container
                        $('#wishlist-container').append(newItem);
                    }

                    // Update wishlist count
                    updateWishlistCount(true);
                } else {
                    // Show error message
                    toastr.warning(response.message);
                }
            },
            error: function () {
                toastr.error('An error occurred. Please try again.');
            },
            complete: function () {
                // Re-enable button
                button.prop('disabled', false);
            }
        });
    });

    // Remove from wishlist
    $(document).on('click', '.remove-from-wishlist', function (e) {
        e.preventDefault();

        var itemId = $(this).data('id');
        var itemElement = $(this).closest('.wishlist-item');

        $.ajax({
            url: '/Wishlist/RemoveItem',
            type: 'POST',
            data: {
                id: itemId,
                __RequestVerificationToken: $('input[name="__RequestVerificationToken"]').val()
            },
            success: function (response) {
                if (response.success) {
                    // Show success message
                    toastr.success(response.message);

                    // Remove item with animation
                    itemElement.fadeOut(300, function () {
                        $(this).remove();

                        // If no items left, show empty wishlist message
                        if ($('.wishlist-item').length === 0) {
                            var emptyMessage = `
                                <div class="col-12 text-center py-5" id="empty-wishlist">
                                    <h3>Your wishlist is empty</h3>
                                    <p>Browse our products and add items to your wishlist</p>
                                    <a href="/Products" class="btn btn-primary">Browse Products</a>
                                </div>
                            `;
                            $('#wishlist-container').html(emptyMessage);
                        }
                    });

                    // Update wishlist count
                    updateWishlistCount(false);
                } else {
                    // Show error message
                    toastr.error(response.message);
                }
            },
            error: function () {
                toastr.error('An error occurred. Please try again.');
            }
        });
    });

    // Function to update wishlist count
    function updateWishlistCount(increment) {
        var countElement = $('#wishlist-count');
        var currentCount = parseInt(countElement.text()) || 0;

        if (increment) {
            currentCount++;
        } else {
            currentCount = Math.max(0, currentCount - 1);
        }

        countElement.text(currentCount);

        if (currentCount > 0) {
            countElement.show();
        } else {
            countElement.hide();
        }
    }
});
document.addEventListener('DOMContentLoaded', function () {
    // Get all remove buttons
    const removeButtons = document.querySelectorAll('.remove-from-wishlist');

    removeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const itemId = this.getAttribute('data-id');

            // Show confirmation dialog
            //const userConfirmed = confirm("Are you sure you want to remove this item from your wishlist?");

          
                // Make AJAX call to remove item
                fetch('/Wishlist/RemoveFromWishlist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'RequestVerificationToken': document.querySelector('input[name="__RequestVerificationToken"]')?.value || ''
                    },
                    body: JSON.stringify({ id: itemId })
                })
                    .then(response => {
                        if (response.ok) {
                            // Refresh the page after successful removal
                            location.reload();
                        } else {
                            alert('Error removing item from wishlist');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert('Error removing item from wishlist');
                    });
            
        });
    });
});