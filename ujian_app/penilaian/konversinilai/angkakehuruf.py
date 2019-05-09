class convertToHuruf() :
    
    """
    rumus : Skor maksimum - skor minimum / 4

    """
    def Rentang(self, skorMax:char, skorMin:char) :
        rentang = skorMax - skorMin / 4
        return rentang

    def  convert(self) :
        tempA = skorMax - Rentang.rentang
        topA = skorMax
        bottomA = tempA

        tempB = bottomA - Rentang.rentang
        topB = bottomA-1
        bottomB = tempB

        tempC = bottomB - Rentang.rentang
        topC = bottomB-1
        bottomC =  tempC

        tempD = bottomC - Rentang.rentang
        topD = bottomC
        bottomD = tempD

        if skorAngka < skorMax or skorAngka >= bottomA
        
