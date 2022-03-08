const Vendor_AddNewItem = (props) => {

    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };
    const [password, setPassword] = React.useState('');
    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const resetInputs = () => {
        setEmail("");
        setPassword("");
    };

    const onSubmit1 = (event) => {

        event.preventDefault();

        const newUser = {
            email: email,
            password: password,
        };

        axios
            .post("/api/loginREG", newUser)
            .then((response) => {
                console.log(response.data);

                if(response.data.role=="User")
                {
                 navigate("/student");
                //  console.log("STUPID LIFE");
                  <Student_Profile datafromParent ={response.data.element}/>
                }

                if(response.data.role=="Vendor")
                {
                navigate("/vendor");
                }
            })
            .catch(function (error) {
                alert("Invalid Credentials");
                console.log(error);

              });

        resetInputs();
      
    };
      
    return (
        <Grid container align={"center"} spacing={2} >

            <Grid item xs={12}>
                <Box sx={{ minWidth: 120 }}>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={onChangeEmail}
                        /></Grid> </Box>
            </Grid>

            <Grid item xs={12}>
                <Box sx={{ minWidth: 120 }}>
                    <Grid item xs={12}>
                        <TextField
                            label="Password"
                            variant="outlined"
                            value={password}
                            onChange={onChangePassword}
                        />
                    </Grid>

                </Box>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" onClick={onSubmit1}>
                    Login
                </Button>
            </Grid>
        </Grid>
    );
};