;;Smart Contract that helps the person to person money lending process easy. 


;; constants
(define-constant contract-owner tx-sender) ;;It keeps the track of Contract Owner
(define-constant err-owner-only (err u100)) ;;error if owner access function is accessed by non owner
(define-constant err-not-enough-money (err u50)) ;;if there is not enough tokens or not enough balance in user to take loan
(define-constant err-owner-cannot-be-user (err u51)) ;;error is owner tries to add user with his own address

;; data maps and vars
(define-data-var token-money int 1000)  ;;this token work as a floating money can be used as lending a loan
(define-map user-balance principal int) ;;this map keeps the track of user address and his equivalent token

;;This function will add the user after which we can perform transaction with him
(define-public (add-user (address principal) ) 
    (begin  
        (asserts! (is-eq tx-sender contract-owner) err-owner-only) ;;check for the owner priviledge
        (asserts!  (not (is-eq address contract-owner)) err-owner-cannot-be-user) ;;check for valid address
        (map-set user-balance address 0) ;;setting the new user
        (ok "Success")
    )
)

;;This function will send token to an principal as an loan amount
(define-public (send-loan (receiver-address principal) (amount int)) 
    (begin  
        (asserts! (is-eq tx-sender contract-owner) err-owner-only) ;;check for the owner priviledge
        (asserts! (>=  (var-get token-money) amount)  err-not-enough-money) ;;token money > amount to be able to send loan
        (asserts! (<= (unwrap-panic (map-get? user-balance receiver-address)) amount)  err-not-enough-money)
        (map-set user-balance receiver-address (+ (unwrap-panic (map-get? user-balance receiver-address)) amount) )
        (var-set token-money (- (var-get token-money) amount))
        (ok "Success")
        )
)


;; This function will take loan from the user
(define-public (take-loan (from-address principal) (amount int)) 
    (begin  
        (asserts! (is-eq tx-sender contract-owner) err-owner-only)
        (asserts! (>= (unwrap-panic (map-get? user-balance from-address)) amount)  err-not-enough-money)
        (map-set user-balance from-address (- (unwrap-panic (map-get? user-balance from-address)) amount) )
        (var-set token-money (+ (var-get token-money) amount))
        (ok "Success")
    )
)

;; THis function will help to read the user balance
(define-read-only (get-user-balance (address principal)) 
  (map-get? user-balance address) 
)
;;This function will return the total token balance
(define-read-only (get-token-balance)
  (var-get token-money)
)
