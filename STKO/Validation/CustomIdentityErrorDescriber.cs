using Microsoft.AspNetCore.Identity;

namespace STKO.Validation
{
    /// <summary>
    /// A class that allows us to display error messages from Identity in Swedish
    /// </summary>
    public class CustomIdentityErrorDescriber : IdentityErrorDescriber
    {
        public override IdentityError ConcurrencyFailure() => new() { Code = nameof(ConcurrencyFailure), Description = "Optimistic concurrency failure, object has been modified." };
        public override IdentityError DefaultError() => new() { Code = nameof(DefaultError), Description = "Ett okänt fel har inträffat" };
        public override IdentityError PasswordMismatch() => new() { Code = nameof(PasswordMismatch), Description = "Felaktigt lösenord" };
        public override IdentityError InvalidToken() => new() { Code = nameof(InvalidToken), Description = "Ogitligt tecken" };
        public override IdentityError LoginAlreadyAssociated() => new() { Code = nameof(LoginAlreadyAssociated), Description = "Det finns redan en användare med detta login" };
        public override IdentityError InvalidUserName(string userName) => new() { Code = nameof(InvalidUserName), Description = $"Användarnamnet' {userName}' har ett ogitligt format (kan endast innehålla siffror och bokstäver utan mellanrum)" };
        public override IdentityError InvalidEmail(string email) => new() { Code = nameof(InvalidEmail), Description = $"ExamTimeDisplayList-postadressen '{email}' har ett felaktigt format" };
        public override IdentityError DuplicateUserName(string userName) => new() { Code = nameof(DuplicateUserName), Description = $"Användarnamnet '{userName}' är redan taget" };
        public override IdentityError DuplicateEmail(string email) => new() { Code = nameof(DuplicateEmail), Description = $"Det finns redan en användare med denna Epost-postadressen '{email}'" };
        public override IdentityError InvalidRoleName(string role) => new() { Code = nameof(InvalidRoleName), Description = $"Rollnamnet '{role}' har ett ogitligt format" };
        public override IdentityError DuplicateRoleName(string role) => new() { Code = nameof(DuplicateRoleName), Description = $"Rollnamnet '{role}' existerar redan" };
        public override IdentityError UserAlreadyHasPassword() => new() { Code = nameof(UserAlreadyHasPassword), Description = "Användaren har redan ett lösenord" };
        public override IdentityError UserLockoutNotEnabled() => new() { Code = nameof(UserLockoutNotEnabled), Description = "Lockout är inte aktiverat för denna användare" };
        public override IdentityError UserAlreadyInRole(string role) => new() { Code = nameof(UserAlreadyInRole), Description = $"Användaren tillhör redan rollen '{role}'" };
        public override IdentityError UserNotInRole(string role) => new() { Code = nameof(UserNotInRole), Description = $"Användare tillhör inte rollen '{role}'" };
        public override IdentityError PasswordTooShort(int length) => new() { Code = nameof(PasswordTooShort), Description = "Lösenordet måste minst vara tre tecken långt" };
        public override IdentityError PasswordRequiresNonAlphanumeric() => new() { Code = nameof(PasswordRequiresNonAlphanumeric), Description = "Lösenordet måste åtminstone ha ett (1) alfanumeriskt tecken" };
        public override IdentityError PasswordRequiresDigit() => new() { Code = nameof(PasswordRequiresDigit), Description = "Lösenordet måste innehålla minst en siffra ('0'-'9')" };
        public override IdentityError PasswordRequiresLower() => new() { Code = nameof(PasswordRequiresLower), Description = "Lösenordet måste innehålla minst en liten bokstav (A-Ö)" };
        public override IdentityError PasswordRequiresUpper() => new() { Code = nameof(PasswordRequiresUpper), Description = "Lösenordet måste innehålla minst en stor bokstav (A-Ö)" };
    }
}
